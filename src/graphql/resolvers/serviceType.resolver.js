import { GraphQLError } from 'graphql';
import { getSession } from '../../auth/index.js';
import { organizationLoader } from '../../loaders/index.js';

export default {
  Query: {
    async serviceTypes(obj, { options }, { db, req }) {
      const session = await getSession(req);

      return await db.ServiceType.findAndCountAllByPage(options);
    },
    async serviceType(obj, { id }, { db, req }) {
      const session = await getSession(req);

      let data = await db.ServiceType.findByPk(id);
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
      const session = await getSession(req);

      return await db.ServiceType.create({ ...input });
    },
    async updateServiceType(obj, { input }, { db, req }) {
      const session = await getSession(req);

      const { id } = input;

      let data = await db.ServiceType.findByPk(id);
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
      const session = await getSession(req);

      let data = await db.ServiceType.findByPk(id);
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
  ServiceType: {
    async organization(serviceType, { options }, { db, literal }) {
      return await organizationLoader.load(serviceType.organizationId);
    },
  },
};
