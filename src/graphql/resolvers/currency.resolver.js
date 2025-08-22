import { GraphQLError } from 'graphql';
import { getSession } from '#auth';

export default {
  Query: {
    async currencies(obj, { options }, { db, req }) {
      const session = await getSession(req);

      return await db.Currency.findAndCountAllByPage(options);
    },
    async currency(obj, { id }, { db, req }) {
      const session = await getSession(req);

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
      const session = await getSession(req);

      return await db.Currency.create({ ...session.createdData, ...input });
    },
    async updateCurrency(obj, { input }, { db, req }) {
      const session = await getSession(req);

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
      const session = await getSession(req);

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
