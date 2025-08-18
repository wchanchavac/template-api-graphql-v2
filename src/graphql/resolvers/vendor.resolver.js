import { GraphQLError } from 'graphql';
import { getSession } from '../../auth/index.js';
import { organizationLoader } from '../../loaders/index.js';

export default {
  Query: {
    async vendors(obj, { options }, { db, req }) {
      const session = await getSession(req);

      return await db.Vendor.findAndCountAllByPage(options);
    },
    async vendor(obj, { id }, { db, req }) {
      const session = await getSession(req);

      let data = await db.Vendor.findByPk(id);
      if (!data)
        throw new GraphQLError(`Vendor with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      return data;
    },
  },
  Mutation: {
    async createVendor(obj, { input }, { db, req }) {
      const session = await getSession(req);

      return await db.Vendor.create({ ...input });
    },
    async updateVendor(obj, { input }, { db, req }) {
      const session = await getSession(req);

      const { id } = input;

      let data = await db.Vendor.findByPk(id);
      if (!data)
        throw new GraphQLError(`Vendor with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.update(input);
      return data;
    },
    async deleteVendor(obj, { id }, { db, req }) {
      const session = await getSession(req);

      let data = await db.Vendor.findByPk(id);
      if (!data)
        throw new GraphQLError(`Vendor with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.destroy();

      return data;
    },
  },
  Vendor: {
    async organization(vendor, { options }, { db, literal }) {
      return await organizationLoader.load(vendor.organizationId);
    },
  },
};
