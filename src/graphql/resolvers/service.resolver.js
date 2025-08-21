import { GraphQLError } from 'graphql';
import { getSession } from '#auth';
import { serviceTypeLoader } from '#loaders';

export default {
  Query: {
    async services(obj, { options }, { db, req }) {
      const session = await getSession(req);

      return await db.Service.findAndCountAllByPage(options);
    },
    async service(obj, { id }, { db, req }) {
      const session = await getSession(req);

      let data = await db.Service.findByPk(id);
      if (!data)
        throw new GraphQLError(`Service with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      return data;
    },
  },
  Mutation: {
    async createService(obj, { input }, { db, req }) {
      const session = await getSession(req);

      return await db.Service.create({ ...session.createdData, ...input });
    },
    async updateService(obj, { input }, { db, req }) {
      const session = await getSession(req);

      const { id } = input;

      let data = await db.Service.findByPk(id);
      if (!data)
        throw new GraphQLError(`Service with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.update(input);
      return data;
    },
    async deleteService(obj, { id }, { db, req }) {
      const session = await getSession(req);

      let data = await db.Service.findByPk(id);
      if (!data)
        throw new GraphQLError(`Service with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.destroy();

      return data;
    },
  },
  Service: {
    async serviceType(service, { options }, { db, literal }) {
      return await serviceTypeLoader.load(service.serviceTypeId);
    },
  },
};
