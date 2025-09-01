import { GraphQLError } from 'graphql';
import { getSession } from '#auth';

export default {
  Query: {
    async levels(obj, { options }, { db, req }) {
      const session = await getSession(req, ['level.read']);

      return await db.Level.findAndCountAllByPage(options);
    },
    async level(obj, { id }, { db, req }) {
      const session = await getSession(req, ['level.read']);

      let data = await db.Level.findByPk(id);
      if (!data)
        throw new GraphQLError(`Level with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      return data;
    },
  },
  Mutation: {
    async createLevel(obj, { input }, { db, req }) {
      const session = await getSession(req, ['level.create']);

      return await db.Level.create({ ...session.createdData, ...input });
    },
    async updateLevel(obj, { input }, { db, req }) {
      const session = await getSession(req, ['level.update']);

      const { id } = input;

      let data = await db.Level.findByPk(id);
      if (!data)
        throw new GraphQLError(`Level with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.update(input);
      return data;
    },
    async deleteLevel(obj, { id }, { db, req }) {
      const session = await getSession(req, ['level.delete']);

      let data = await db.Level.findByPk(id);
      if (!data)
        throw new GraphQLError(`Level with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.destroy();

      return data;
    },
  },
  Level: {},
};
