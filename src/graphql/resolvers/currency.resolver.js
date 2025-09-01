import { GraphQLError } from 'graphql';
import { getSession } from '#auth';

export default {
  Query: {
    async currencies(obj, { options }, { db, req }) {
      const session = await getSession(req, ['currency.read']);

      return await db.Currency.findAndCountAllByPage({
        ...options,
        scopes: [{ method: ['byUserType', session.session] }],
      });
    },
    async currency(obj, { id }, { db, req }) {
      const session = await getSession(req, ['currency.read']);

      let data = await db.Currency.findByPk(id);
      if (!data)
        throw new GraphQLError(`Currency with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      return data;
    },
  },
  Mutation: {
    async createCurrency(obj, { input }, { db, req }) {
      const session = await getSession(req, ['currency.create']);

      try {
        return await db.Currency.create({ ...session.createdData, ...input });
      } catch (error) {
        console.error(error);
        throw new GraphQLError(error.message, {
          extensions: {
            code: 'INTERNAL_SERVER_ERROR',
          },
        });
      }
    },
    async updateCurrency(obj, { input }, { db, req }) {
      const session = await getSession(req, ['currency.update']);

      const { id } = input;

      let data = await db.Currency.findByPk(id);
      if (!data)
        throw new GraphQLError(`Currency with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.update(input);
      return data;
    },
    async deleteCurrency(obj, { id }, { db, req }) {
      const session = await getSession(req, ['currency.delete']);

      let data = await db.Currency.findByPk(id);
      if (!data)
        throw new GraphQLError(`Currency with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.destroy();

      return data;
    },
  },
  Currency: {},
};
