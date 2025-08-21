import { GraphQLError } from 'graphql';
import { getSession } from '#auth';
import { regionLoader } from '#loaders';

export default {
  Query: {
    async zones(obj, { options }, { db, req }) {
      const session = await getSession(req);

      return await db.Zone.findAndCountAllByPage(options);
    },
    async zone(obj, { id }, { db, req }) {
      const session = await getSession(req);

      let data = await db.Zone.findByPk(id);
      if (!data)
        throw new GraphQLError(`Zone with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      return data;
    },
  },
  Mutation: {
    async createZone(obj, { input }, { db, req }) {
      const session = await getSession(req);

      return await db.Zone.create({ ...session.createdData, ...input });
    },
    async updateZone(obj, { input }, { db, req }) {
      const session = await getSession(req);

      const { id } = input;

      let data = await db.Zone.findByPk(id);
      if (!data)
        throw new GraphQLError(`Zone with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.update(input);
      return data;
    },
    async deleteZone(obj, { id }, { db, req }) {
      const session = await getSession(req);

      let data = await db.Zone.findByPk(id);
      if (!data)
        throw new GraphQLError(`Zone with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.destroy();

      return data;
    },
  },
  Zone: {
    async region(zone, { options }, { db, literal }) {
      return await regionLoader.load(zone.regionId);
    },
  },
};
