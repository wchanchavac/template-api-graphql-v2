import { GraphQLError } from 'graphql';
import { getSession } from '#auth';
import {
  regionLoader,
  zoneLoader,
  subzoneLoader,
  areaLoader,
  stateLoader,
  siteTechnologyLoader,
  siteTechnologyBySiteLoader,
} from '#loaders';

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

      return await db.Site.create({ ...session.createdData, ...input });
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
    async technologies(site, { options }, { db, literal }) {
      console.log('site', site);
      const data = await siteTechnologyBySiteLoader.load(site.id);
      console.log('data', data);
      return data;
    },
  },
};
