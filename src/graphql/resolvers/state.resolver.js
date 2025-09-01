import { GraphQLError } from 'graphql';
import { getSession } from '#auth';

export default {
  Query: {
    async states(obj, { options }, { db, req }) {
      const session = await getSession(req, 'state.read');

      return await db.State.findAndCountAllByPage({
        ...options,
        scopes: [{ method: ['byOrganization', session.session] }],
      });
    },
    async state(obj, { id }, { db, req }) {
      const session = await getSession(req, 'state.read');

      let data = await db.State.findByPk(id, {
        scopes: [{ method: ['byOrganization', session.session] }],
      });
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
      const session = await getSession(req, 'state.create');

      return await db.State.create({ ...session.createdData, ...input });
    },
    async updateState(obj, { input }, { db, req }) {
      const session = await getSession(req, 'state.update');

      const { id } = input;

      let data = await db.State.findByPk(id, {
        scopes: [{ method: ['byOrganization', session.session] }],
      });
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
      const session = await getSession(req, 'state.delete');

      let data = await db.State.findByPk(id, {
        scopes: [{ method: ['byOrganization', session.session] }],
      });
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
