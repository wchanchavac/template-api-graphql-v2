import { GraphQLError } from 'graphql';
import { getSession } from '#auth';
import {
  organizationLoader,
  commentLoader,
  attachmentByCommentLoader,
} from '#loaders';

export default {
  Query: {
    async attachments(obj, { options }, { db, req }) {
      const session = await getSession(req);

      return await db.Attachment.findAndCountAllByPage(options);
    },
    async attachment(obj, { id }, { db, req }) {
      const session = await getSession(req);

      let data = await db.Attachment.findByPk(id);
      if (!data)
        throw new GraphQLError(`Attachment with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      return data;
    },
    async attachmentsByComment(obj, { commentId }, { db, req }) {
      const session = await getSession(req);

      return await attachmentByCommentLoader.load(commentId);
    },
    async attachmentWithData(obj, { id }, { db, req }) {
      const session = await getSession(req);

      let data = await db.Attachment.scope('withData').findByPk(id);
      if (!data)
        throw new GraphQLError(`Attachment with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      return data;
    },
  },
  Mutation: {
    async createAttachment(obj, { input }, { db, req }) {
      const session = await getSession(req);

      // Convert base64 data to buffer for BLOB storage
      const { data, ...attachmentData } = input;
      const binaryData = Buffer.from(data, 'base64');

      return await db.Attachment.create({
        ...session.createdData,
        ...attachmentData,
        data: binaryData,
      });
    },
    async updateAttachment(obj, { input }, { db, req }) {
      const session = await getSession(req);

      const { id, data, ...updateData } = input;

      let attachment = await db.Attachment.findByPk(id);
      if (!attachment)
        throw new GraphQLError(`Attachment with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });

      // Convert base64 data to buffer if data is being updated
      if (data) {
        updateData.data = Buffer.from(data, 'base64');
      }

      await attachment.update(updateData);
      return attachment;
    },
    async deleteAttachment(obj, { id }, { db, req }) {
      const session = await getSession(req);

      let data = await db.Attachment.findByPk(id);
      if (!data)
        throw new GraphQLError(`Attachment with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.destroy();

      return data;
    },
  },
  Attachment: {
    // async organization(attachment, { options }, { db, literal }) {
    //   return await organizationLoader.load(attachment.organizationId);
    // },
    // async comment(attachment, { options }, { db, literal }) {
    //   return await commentLoader.load(attachment.commentId);
    // },
  },
};
