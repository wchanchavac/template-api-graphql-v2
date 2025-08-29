import express from 'express';
import { handleFileUpload, downloadFile } from '#services/uploadService';

const router = express.Router();

/**
 * POST /api/upload
 * Upload a file attachment to a comment
 *
 * Expected form data:
 * - file: The file to upload (multipart/form-data)
 * - commentId: UUID of the comment to attach the file to
 *
 * Returns:
 * - 201: File uploaded successfully
 * - 400: Bad request (missing file or commentId)
 * - 401: Unauthorized
 * - 404: Comment not found
 * - 413: File too large
 * - 500: Server error
 */
router.post('/upload', handleFileUpload);

/**
 * GET /api/download/:id
 * Download a file attachment by its ID
 *
 * Parameters:
 * - id: UUID of the attachment
 *
 * Returns:
 * - 200: File data with appropriate headers
 * - 401: Unauthorized
 * - 404: File not found
 * - 500: Server error
 */
router.get('/download/:id', downloadFile);

export default router;
