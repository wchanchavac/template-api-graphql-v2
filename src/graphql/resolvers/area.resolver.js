import { GraphQLError } from 'graphql';
import { getSession } from '#auth';

export default {
  Query: {
    async areas(obj, { options }, { db, req }) {
      const session = await getSession(req);

      return await db.Area.findAndCountAllByPage(options);
    },
    async area(obj, { id }, { db, req }) {
      const session = await getSession(req);

      let data = await db.Area.findByPk(id);
      if (!data)
        throw new GraphQLError(`Area with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      return data;
    },
  },
  Mutation: {
    async createArea(obj, { input }, { db, req }) {
      const session = await getSession(req);

      return await db.Area.create({ ...session.createdData, ...input });
    },
    async updateArea(obj, { input }, { db, req }) {
      const session = await getSession(req);

      const { id } = input;

      let data = await db.Area.findByPk(id);
      if (!data)
        throw new GraphQLError(`Area with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.update(input);
      return data;
    },
    async deleteArea(obj, { id }, { db, req }) {
      const session = await getSession(req);

      let data = await db.Area.findByPk(id);
      if (!data)
        throw new GraphQLError(`Area with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.destroy();

      return data;
    },
  },
  Area: {},
};
