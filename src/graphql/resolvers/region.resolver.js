import { GraphQLError } from 'graphql';
import { getSession } from '#auth';

export default {
  Query: {
    async regions(obj, { options }, { db, req }) {
      const session = await getSession(req, 'region.read');

      return await db.Region.findAndCountAllByPage({
        ...options,
        scopes: [
          { method: ['byOrganization', session.session] },
          { method: ['byRegion', session.session] },
        ],
      });
    },
    async region(obj, { id }, { db, req }) {
      const session = await getSession(req, 'region.read');

      let data = await db.Region.findByPk(id, {
        scopes: [
          { method: ['byOrganization', session.session] },
          { method: ['byRegion', session.session] },
        ],
      });
      if (!data)
        throw new GraphQLError(`Region with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      return data;
    },
  },
  Mutation: {
    async createRegion(obj, { input }, { db, req }) {
      const session = await getSession(req, 'region.create');

      return await db.Region.create({ ...session.createdData, ...input });
    },
    async updateRegion(obj, { input }, { db, req }) {
      const session = await getSession(req, 'region.update');

      const { id } = input;

      let data = await db.Region.findByPk(id, {
        scopes: [
          { method: ['byOrganization', session.session] },
          { method: ['byRegion', session.session] },
        ],
      });
      if (!data)
        throw new GraphQLError(`Region with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.update(input);
      return data;
    },
    async deleteRegion(obj, { id }, { db, req }) {
      const session = await getSession(req, 'region.delete');

      let data = await db.Region.findByPk(id, {
        scopes: [
          { method: ['byOrganization', session.session] },
          { method: ['byRegion', session.session] },
        ],
      });
      if (!data)
        throw new GraphQLError(`Region with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.destroy();

      return data;
    },
  },
  Region: {},
};
