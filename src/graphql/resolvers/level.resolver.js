import { GraphQLError } from 'graphql';
import { getSession } from '../../auth/index.js';
import { organizationLoader } from '../../loaders/index.js';

export default {
  Query: {
    async levels(obj, { options }, { db, req }) {
      const session = await getSession(req);

      return await db.Level.findAndCountAllByPage(options);
    },
    async level(obj, { id }, { db, req }) {
      const session = await getSession(req);

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
      const session = await getSession(req);

      return await db.Level.create({ ...input });
    },
    async updateLevel(obj, { input }, { db, req }) {
      const session = await getSession(req);

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
      const session = await getSession(req);

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
  Level: {
    async organization(level, { options }, { db, literal }) {
      return await organizationLoader.load(level.organizationId);
    },
  },
};
