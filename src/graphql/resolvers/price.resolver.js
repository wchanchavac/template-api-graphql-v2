import { GraphQLError } from 'graphql';
import { getSession } from '#auth';
import conceptLoader from '#loaders/concept.loader';
import vendorLoader from '#loaders/vendor.loader';
import regionLoader from '#loaders/region.loader';

export default {
  Query: {
    async prices(obj, { options }, { db, req }) {
      const session = await getSession(req, ['price.read']);

      return await db.Price.findAndCountAllByPage({
        ...options,
        scopes: [
          { method: ['byOrganization', session.session] },
          { method: ['byRegion', session.session] },
        ],
      });
    },
    async price(obj, { id }, { db, req }) {
      const session = await getSession(req, ['price.read']);

      let data = await db.Price.findByPk(id, {
        scopes: [
          { method: ['byOrganization', session.session] },
          { method: ['byRegion', session.session] },
        ],
      });
      if (!data)
        throw new GraphQLError(`Price with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      return data;
    },
  },
  Mutation: {
    async createPrice(obj, { input }, { db, req }) {
      const session = await getSession(req, ['price.create']);

      return await db.Price.create({ ...session.createdData, ...input });
    },
    async updatePrice(obj, { input }, { db, req }) {
      const session = await getSession(req, ['price.update']);

      const { id } = input;

      let data = await db.Price.findByPk(id, {
        scopes: [
          { method: ['byOrganization', session.session] },
          { method: ['byRegion', session.session] },
        ],
      });
      if (!data)
        throw new GraphQLError(`Price with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.update(input);
      return data;
    },
    async deletePrice(obj, { id }, { db, req }) {
      const session = await getSession(req, ['price.delete']);

      let data = await db.Price.findByPk(id, {
        scopes: [
          { method: ['byOrganization', session.session] },
          { method: ['byRegion', session.session] },
        ],
      });
      if (!data)
        throw new GraphQLError(`Price with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.destroy();

      return data;
    },
  },
  Price: {
    async concept(price) {
      return await conceptLoader.load(price.conceptId);
    },
    async vendor(price) {
      return await vendorLoader.load(price.vendorId);
    },
    async region(price) {
      return await regionLoader.load(price.regionId);
    },
  },
};
