import { GraphQLError } from 'graphql';
import { getSession } from '#auth';
import { vendorLoader } from '#loaders';

export default {
  Query: {
    async siteVendors(obj, { options }, { db, req }) {
      const session = await getSession(req, 'vendor.read');

      return await db.SiteVendor.findAndCountAllByPage(options, {
        scopes: [
          { method: ['byOrganization', session.session] },
          { method: ['byRegion', session.session] },
        ],
      });
    },
    async siteVendor(obj, { id }, { db, req }) {
      const session = await getSession(req, 'vendor.read');

      let data = await db.SiteVendor.findByPk(id, {
        scopes: [
          { method: ['byOrganization', session.session] },
          { method: ['byRegion', session.session] },
        ],
      });
      if (!data)
        throw new GraphQLError(`SiteVendor with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      return data;
    },
  },
  Mutation: {
    async createSiteVendor(obj, { input }, { db, req }) {
      const session = await getSession(req, 'vendor.create');

      return await db.SiteVendor.create({
        ...session.createdData,
        ...input,
      });
    },
    async updateSiteVendor(obj, { input }, { db, req }) {
      const session = await getSession(req, 'vendor.update');

      const { id } = input;

      let data = await db.SiteVendor.findByPk(id, {
        scopes: [
          { method: ['byOrganization', session.session] },
          { method: ['byRegion', session.session] },
        ],
      });
      if (!data)
        throw new GraphQLError(`SiteVendor with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.update(input);
      return data;
    },
    async deleteSiteVendor(obj, { id }, { db, req }) {
      const session = await getSession(req, 'vendor.delete');

      let data = await db.SiteVendor.findByPk(id, {
        scopes: [
          { method: ['byOrganization', session.session] },
          { method: ['byRegion', session.session] },
        ],
      });
      if (!data)
        throw new GraphQLError(`SiteVendor with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.destroy();

      return data;
    },
  },
  SiteVendor: {
    // async organization(siteVendor, { options }, { db, literal }) {
    //   return await organizationLoader.load(siteVendor.organizationId);
    // },
    // async site(siteVendor, { options }, { db, literal }) {
    //   return await siteLoader.load(siteVendor.siteId);
    // },
    async vendor(siteVendor, { options }, { db, literal }) {
      return await vendorLoader.load(siteVendor.vendorId);
    },
  },
};
