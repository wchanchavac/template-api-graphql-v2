import { GraphQLError } from 'graphql';
import { getSession } from '#auth';
import {
  userLoader,
  commentByEntityLoader,
  attachmentByCommentLoader,
} from '#loaders';

export default {
  Query: {
    async comments(obj, { options }, { db, req }) {
      const session = await getSession(req, []);

      return await db.Comment.findAndCountAllByPage({
        ...options,
        scopes: [{ method: ['byOrganization', session.session] }],
      });
    },
    async comment(obj, { id }, { db, req }) {
      const session = await getSession(req, []);

      let data = await db.Comment.findByPk(id, {
        scopes: [{ method: ['byOrganization', session.session] }],
      });
      if (!data)
        throw new GraphQLError(`Comment with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      return data;
    },
    async commentsByEntity(obj, { entityId, entityType }, { db, req }) {
      const session = await getSession(req, []);

      return await db.Comment.findAll({
        where: {
          entityId,
          entityType,
        },
        sort: [['createdAt', 'DESC']],
        scopes: [{ method: ['byOrganization', session.session] }],
      });
    },
  },
  Mutation: {
    async createComment(obj, { input }, { db, req }) {
      const session = await getSession(req, ['comment.create']);

      return await db.Comment.create({
        ...session.createdData,
        ...input,
        userId: session.userData.id,
      });
    },
    async updateComment(obj, { input }, { db, req }) {
      const session = await getSession(req, ['comment.update']);

      const { id } = input;

      let data = await db.Comment.findByPk(id, {
        scopes: [{ method: ['byOrganization', session.session] }],
      });
      if (!data)
        throw new GraphQLError(`Comment with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.update(input);
      return data;
    },
    async deleteComment(obj, { id }, { db, req }) {
      const session = await getSession(req, ['comment.delete']);

      let data = await db.Comment.findByPk(id, {
        scopes: [{ method: ['byOrganization', session.session] }],
      });
      if (!data)
        throw new GraphQLError(`Comment with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.destroy();

      return data;
    },
  },
  Comment: {
    // async organization(comment, { options }, { db, literal }) {
    //   return await organizationLoader.load(comment.organizationId);
    // },
    async user(comment, { options }, { db, literal }) {
      return await userLoader.load(comment.userId);
    },
    async attachments(comment, { options }, { db, literal }) {
      return await attachmentByCommentLoader.load(comment.id);
    },
  },
};
