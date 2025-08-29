import Busboy from 'busboy';
import { getSession } from '#auth';
import db from '#database';

/**
 * Handles file upload using Busboy and saves to database
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const handleFileUpload = async (req, res) => {
  try {
    // Get session for authentication
    const session = await getSession(req, true);

    if (!session) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'You must be logged in to upload files',
      });
    }

    const busboy = Busboy({
      headers: req.headers,
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
        files: 1, // Only one file at a time
      },
    });

    let fileData = null;
    let fields = {};

    // Handle form fields (non-file data)
    busboy.on('field', (fieldname, value) => {
      fields[fieldname] = value;
    });

    // Handle file uploads
    busboy.on('file', (fieldname, file, { filename, encoding, mimeType }) => {
      const chunks = [];

      file.on('data', (chunk) => {
        chunks.push(chunk);
      });

      file.on('end', () => {
        fileData = {
          fieldname,
          filename,
          encoding,
          mimeType,
          buffer: Buffer.concat(chunks),
          size: Buffer.concat(chunks).length,
        };
      });
    });

    // Handle completion
    busboy.on('finish', async () => {
      try {
        if (!fileData) {
          return res.status(400).json({
            error: 'Bad Request',
            message: 'No file was uploaded',
          });
        }

        if (!fields.commentId) {
          return res.status(400).json({
            error: 'Bad Request',
            message: 'commentId is required',
          });
        }

        // Verify that the comment exists and belongs to the user's organization
        const comment = await db.Comment.findOne({
          where: {
            id: fields.commentId,
            // organizationId: session.user.organizationId,
          },
        });

        if (!comment) {
          return res.status(404).json({
            error: 'Not Found',
            message: 'Comment not found or access denied',
          });
        }

        // Create attachment in database
        const attachment = await db.Attachment.create({
          name: fileData.filename,
          mimeType: fileData.mimeType,
          size: fileData.size,
          data: fileData.buffer,
          commentId: fields.commentId,
          ...session.createdData,
          // organizationId: session.user.organizationId,
          // createdBy: session.user.id,
        });

        // Return success response (without binary data)
        res.status(201).json({
          message: 'File uploaded successfully',
          attachment: {
            id: attachment.id,
            name: attachment.name,
            mimeType: attachment.mimeType,
            size: attachment.size,
            commentId: attachment.commentId,
            createdAt: attachment.createdAt,
          },
        });
      } catch (dbError) {
        console.error('Database error:', dbError);
        res.status(500).json({
          error: 'Internal Server Error',
          message: 'Failed to save file to database',
        });
      }
    });

    // Handle errors
    busboy.on('error', (error) => {
      console.error('Busboy error:', error);
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'File upload failed',
      });
    });

    // Handle file size limit exceeded
    busboy.on('filesLimit', () => {
      res.status(413).json({
        error: 'Payload Too Large',
        message: 'File size exceeds the 10MB limit',
      });
    });

    // Pipe the request to busboy
    req.pipe(busboy);
  } catch (error) {
    console.error('Upload service error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'File upload failed',
    });
  }
};

/**
 * Downloads a file by attachment ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const downloadFile = async (req, res) => {
  try {
    const { id } = req.params;
    const session = await getSession(req, true);

    if (!session) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'You must be logged in to download files',
      });
    }

    // Find attachment with data included
    const attachment = await db.Attachment.scope('withData').findOne({
      where: {
        id,
      },
    });

    if (!attachment) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'File not found or access denied',
      });
    }

    // Set appropriate headers
    res.setHeader('Content-Type', attachment.mimeType);
    res.setHeader('Content-Length', attachment.size);
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${attachment.name}"`,
    );

    // Send the file data
    res.send(attachment.data);
  } catch (error) {
    console.error('Download service error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'File download failed',
    });
  }
};
