import { GraphQLError } from 'graphql';
import { getSession } from '../../auth/index.js';
import { organizationLoader } from '../../loaders/index.js';

export default {
  Query: {
    async states(obj, { options }, { db, req }) {
      const session = await getSession(req);

      return await db.State.findAndCountAllByPage(options);
    },
    async state(obj, { id }, { db, req }) {
      const session = await getSession(req);

      let data = await db.State.findByPk(id);
      if (!data)
        throw new GraphQLError(`State with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      return data;
    },
  },
  Mutation: {
    async createState(obj, { input }, { db, req }) {
      const session = await getSession(req);

      return await db.State.create({ ...input, ...session });
    },
    async updateState(obj, { input }, { db, req }) {
      const session = await getSession(req);

      const { id } = input;

      let data = await db.State.findByPk(id);
      if (!data)
        throw new GraphQLError(`State with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.update(input);
      return data;
    },
    async deleteState(obj, { id }, { db, req }) {
      const session = await getSession(req);

      let data = await db.State.findByPk(id);
      if (!data)
        throw new GraphQLError(`State with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.destroy();

      return data;
    },
  },
  State: {},
};
