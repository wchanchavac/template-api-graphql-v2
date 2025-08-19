import { GraphQLError } from 'graphql';
import { getSession } from '../../auth/index.js';
import { organizationLoader } from '../../loaders/index.js';

export default {
  Query: {
    async technologies(obj, { options }, { db, req }) {
      const session = await getSession(req);

      return await db.Technology.findAndCountAllByPage(options);
    },
    async technology(obj, { id }, { db, req }) {
      const session = await getSession(req);

      let data = await db.Technology.findByPk(id);
      if (!data)
        throw new GraphQLError(`Technology with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      return data;
    },
  },
  Mutation: {
    async createTechnology(obj, { input }, { db, req }) {
      const session = await getSession(req);

      return await db.Technology.create({ ...session.createdData, ...input });
    },
    async updateTechnology(obj, { input }, { db, req }) {
      const session = await getSession(req);

      const { id } = input;

      let data = await db.Technology.findByPk(id);
      if (!data)
        throw new GraphQLError(`Technology with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.update(input);
      return data;
    },
    async deleteTechnology(obj, { id }, { db, req }) {
      const session = await getSession(req);

      let data = await db.Technology.findByPk(id);
      if (!data)
        throw new GraphQLError(`Technology with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.destroy();

      return data;
    },
  },
  Technology: {},
};
