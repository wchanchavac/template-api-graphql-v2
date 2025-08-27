import { GraphQLError } from 'graphql';
import { getSession } from '#auth';
import { siteLoader, technologyLoader } from '#loaders';

export default {
  Query: {
    async siteTechnologies(obj, { options }, { db, req }) {
      const session = await getSession(req);

      return await db.SiteTechnology.findAndCountAllByPage(options);
    },
    async siteTechnology(obj, { id }, { db, req }) {
      const session = await getSession(req);

      let data = await db.SiteTechnology.findByPk(id);
      if (!data)
        throw new GraphQLError(`SiteTechnology with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      return data;
    },
  },
  Mutation: {
    async createSiteTechnology(obj, { input }, { db, req }) {
      const session = await getSession(req);

      return await db.SiteTechnology.create({
        ...session.createdData,
        ...input,
      });
    },
    async updateSiteTechnology(obj, { input }, { db, req }) {
      const session = await getSession(req);

      const { id } = input;

      let data = await db.SiteTechnology.findByPk(id);
      if (!data)
        throw new GraphQLError(`SiteTechnology with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.update(input);
      return data;
    },
    async deleteSiteTechnology(obj, { id }, { db, req }) {
      const session = await getSession(req);

      let data = await db.SiteTechnology.findByPk(id);
      if (!data)
        throw new GraphQLError(`SiteTechnology with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.destroy();

      return data;
    },
  },
  SiteTechnology: {
    async site(siteTechnology, { options }, { db, literal }) {
      return await siteLoader.load(siteTechnology.siteId);
    },
    async technology(siteTechnology, { options }, { db, literal }) {
      return await technologyLoader.load(siteTechnology.technologyId);
    },
  },
};
