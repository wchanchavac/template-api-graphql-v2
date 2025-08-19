import { GraphQLError } from 'graphql';
import { getSession } from '../../auth/index.js';
import {
  organizationLoader,
  regionLoader,
  zoneLoader,
  subzoneLoader,
  areaLoader,
  stateLoader,
  vendorLoader,
} from '../../loaders/index.js';

export default {
  Query: {
    async sites(obj, { options }, { db, req }) {
      const session = await getSession(req);

      return await db.Site.findAndCountAllByPage(options);
    },
    async site(obj, { id }, { db, req }) {
      const session = await getSession(req);

      let data = await db.Site.findByPk(id);
      if (!data)
        throw new GraphQLError(`Site with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      return data;
    },
  },
  Mutation: {
    async createSite(obj, { input }, { db, req }) {
      const session = await getSession(req);

      return await db.Site.create({ ...input, ...session });
    },
    async updateSite(obj, { input }, { db, req }) {
      const session = await getSession(req);

      const { id } = input;

      let data = await db.Site.findByPk(id);
      if (!data)
        throw new GraphQLError(`Site with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.update(input);
      return data;
    },
    async deleteSite(obj, { id }, { db, req }) {
      const session = await getSession(req);

      let data = await db.Site.findByPk(id);
      if (!data)
        throw new GraphQLError(`Site with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.destroy();

      return data;
    },
  },
  Site: {
    async region(site, { options }, { db, literal }) {
      return await regionLoader.load(site.regionId);
    },
    async zone(site, { options }, { db, literal }) {
      return await zoneLoader.load(site.zoneId);
    },
    async subzone(site, { options }, { db, literal }) {
      return await subzoneLoader.load(site.subzoneId);
    },
    async area(site, { options }, { db, literal }) {
      return await areaLoader.load(site.areaId);
    },
    async state(site, { options }, { db, literal }) {
      return await stateLoader.load(site.stateId);
    },
    /*
        async vendors(site, { options }, { db, literal }) {
            return await vendorLoader.load(site.vendorId);
        },
        */
  },
};
