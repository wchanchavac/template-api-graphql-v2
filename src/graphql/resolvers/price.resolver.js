import { GraphQLError } from 'graphql';
import { getSession } from '#auth';

export default {
  Query: {
    async prices(obj, { options }, { db, req }) {
      const session = await getSession(req);

      return await db.Price.findAndCountAllByPage(options);
    },
    async price(obj, { id }, { db, req }) {
      const session = await getSession(req);

      let data = await db.Price.findByPk(id);
      if (!data)
        throw new GraphQLError(`Price with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      return data;
    },
  },
  Mutation: {
    async createPrice(obj, { input }, { db, req }) {
      const session = await getSession(req);

      return await db.Price.create({ ...session.createdData, ...input });
    },
    async updatePrice(obj, { input }, { db, req }) {
      const session = await getSession(req);

      const { id } = input;

      let data = await db.Price.findByPk(id);
      if (!data)
        throw new GraphQLError(`Price with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.update(input);
      return data;
    },
    async deletePrice(obj, { id }, { db, req }) {
      const session = await getSession(req);

      let data = await db.Price.findByPk(id);
      if (!data)
        throw new GraphQLError(`Price with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.destroy();

      return data;
    },
  },
  Price: {},
};
