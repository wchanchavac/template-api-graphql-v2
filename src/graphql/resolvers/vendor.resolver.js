import { GraphQLError } from 'graphql';
import { getSession } from '#auth';

export default {
  Query: {
    async vendors(obj, { options }, { db, req }) {
      const session = await getSession(req, 'vendor.read');

      return await db.Vendor.findAndCountAllByPage({
        ...options,
        scopes: [
          { method: ['byOrganization', session.session] },
          { method: ['byRegion', session.session] },
        ],
      });
    },
    async vendor(obj, { id }, { db, req }) {
      const session = await getSession(req, 'vendor.read');

      let data = await db.Vendor.findByPk(id, {
        scopes: [
          { method: ['byOrganization', session.session] },
          { method: ['byRegion', session.session] },
        ],
      });
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
      const session = await getSession(req, 'vendor.create');

      return await db.Vendor.create({ ...session.createdData, ...input });
    },
    async updateVendor(obj, { input }, { db, req }) {
      const session = await getSession(req, 'vendor.update');

      const { id } = input;

      let data = await db.Vendor.findByPk(id, {
        scopes: [
          { method: ['byOrganization', session.session] },
          { method: ['byRegion', session.session] },
        ],
      });
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
      const session = await getSession(req, 'vendor.delete');

      let data = await db.Vendor.findByPk(id, {
        scopes: [
          { method: ['byOrganization', session.session] },
          { method: ['byRegion', session.session] },
        ],
      });
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
    // async siteVendors(vendor, { options }, { db, literal }) {
    //   return await siteVendorByVendorLoader.load(vendor.id);
    // },
  },
};
