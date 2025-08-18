import { GraphQLError } from 'graphql';
import { getSession } from '../../auth/index.js';
import {} from '../../loaders/index.js';

export default {
  Query: {
    async countries(obj, { options }, { db, req }) {
      const session = await getSession(req);

      return await db.Country.findAndCountAllByPage(options);
    },
    async country(obj, { id }, { db, req }) {
      const session = await getSession(req);

      let data = await db.Country.findByPk(id);
      if (!data)
        throw new GraphQLError(`Country with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      return data;
    },
  },
  Mutation: {
    async createCountry(obj, { input }, { db, req }) {
      const session = await getSession(req);

      return await db.Country.create({ ...input });
    },
    async updateCountry(obj, { input }, { db, req }) {
      const session = await getSession(req);

      const { id } = input;

      let data = await db.Country.findByPk(id);
      if (!data)
        throw new GraphQLError(`Country with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.update(input);
      return data;
    },
    async deleteCountry(obj, { id }, { db, req }) {
      const session = await getSession(req);

      let data = await db.Country.findByPk(id);
      if (!data)
        throw new GraphQLError(`Country with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.destroy();

      return data;
    },
  },
  Country: {},
};
