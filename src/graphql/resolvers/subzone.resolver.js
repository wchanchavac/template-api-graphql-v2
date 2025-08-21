import { GraphQLError } from 'graphql';
import { getSession } from '#auth';
import { zoneLoader } from '#loaders';

export default {
  Query: {
    async subzones(obj, { options }, { db, req }) {
      const session = await getSession(req);

      return await db.Subzone.findAndCountAllByPage(options);
    },
    async subzone(obj, { id }, { db, req }) {
      const session = await getSession(req);

      let data = await db.Subzone.findByPk(id);
      if (!data)
        throw new GraphQLError(`Subzone with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      return data;
    },
  },
  Mutation: {
    async createSubzone(obj, { input }, { db, req }) {
      const session = await getSession(req);

      return await db.Subzone.create({ ...session.createdData, ...input });
    },
    async updateSubzone(obj, { input }, { db, req }) {
      const session = await getSession(req);

      const { id } = input;

      let data = await db.Subzone.findByPk(id);
      if (!data)
        throw new GraphQLError(`Subzone with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.update(input);
      return data;
    },
    async deleteSubzone(obj, { id }, { db, req }) {
      const session = await getSession(req);

      let data = await db.Subzone.findByPk(id);
      if (!data)
        throw new GraphQLError(`Subzone with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.destroy();

      return data;
    },
  },
  Subzone: {
    async zone(subzone, { options }, { db, literal }) {
      return await zoneLoader.load(subzone.zoneId);
    },
  },
};
