import { GraphQLError } from 'graphql';
import { getSession } from '#auth';

export default {
  Query: {
    async statuses(obj, { options }, { db, req }) {
      const session = await getSession(req);

      return await db.Status.findAndCountAllByPage(options);
    },
    async status(obj, { id }, { db, req }) {
      const session = await getSession(req);

      let data = await db.Status.findByPk(id);
      if (!data)
        throw new GraphQLError(`Status with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      return data;
    },
  },
  Mutation: {
    async createStatus(obj, { input }, { db, req }) {
      const session = await getSession(req);

      return await db.Status.create({ ...session.createdData, ...input });
    },
    async updateStatus(obj, { input }, { db, req }) {
      const session = await getSession(req);

      const { id } = input;

      let data = await db.Status.findByPk(id);
      if (!data)
        throw new GraphQLError(`Status with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.update(input);
      return data;
    },
    async deleteStatus(obj, { id }, { db, req }) {
      const session = await getSession(req);

      let data = await db.Status.findByPk(id);
      if (!data)
        throw new GraphQLError(`Status with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.destroy();

      return data;
    },
  },
  Status: {},
};
