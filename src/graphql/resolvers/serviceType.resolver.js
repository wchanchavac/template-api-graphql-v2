import { GraphQLError } from 'graphql';
import { getSession } from '#auth';

export default {
  Query: {
    async serviceTypes(obj, { options }, { db, req }) {
      const session = await getSession(req, ['serviceType.read']);

      return await db.ServiceType.findAndCountAllByPage({
        ...options,
        scopes: [{ method: ['byOrganization', session.session] }],
      });
    },
    async serviceType(obj, { id }, { db, req }) {
      const session = await getSession(req, ['serviceType.read']);

      let data = await db.ServiceType.findByPk(id, {
        scopes: [{ method: ['byOrganization', session.session] }],
      });
      if (!data)
        throw new GraphQLError(`ServiceType with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      return data;
    },
  },
  Mutation: {
    async createServiceType(obj, { input }, { db, req }) {
      const session = await getSession(req, ['serviceType.create']);

      return await db.ServiceType.create({ ...session.createdData, ...input });
    },
    async updateServiceType(obj, { input }, { db, req }) {
      const session = await getSession(req, ['serviceType.update']);

      const { id } = input;

      let data = await db.ServiceType.findByPk(id, {
        scopes: [{ method: ['byOrganization', session.session] }],
      });
      if (!data)
        throw new GraphQLError(`ServiceType with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.update(input);
      return data;
    },
    async deleteServiceType(obj, { id }, { db, req }) {
      const session = await getSession(req, ['serviceType.delete']);

      let data = await db.ServiceType.findByPk(id, {
        scopes: [{ method: ['byOrganization', session.session] }],
      });
      if (!data)
        throw new GraphQLError(`ServiceType with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.destroy();

      return data;
    },
  },
  ServiceType: {},
};
