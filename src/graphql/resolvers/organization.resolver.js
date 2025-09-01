import { GraphQLError } from 'graphql';
import { getSession } from '#auth';

export default {
  Query: {
    async organizations(obj, { options }, { db, req }) {
      const session = await getSession(req, 'organization.read');

      return await db.Organization.findAndCountAllByPage(options);
    },
    async organization(obj, { id }, { db, req }) {
      const session = await getSession(req, 'organization.read');

      let data = await db.Organization.findByPk(id);
      if (!data)
        throw new GraphQLError(`Organization with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      return data;
    },
  },
  Mutation: {
    async createOrganization(obj, { input }, { db, req }) {
      const session = await getSession(req, 'organization.create');

      return await db.Organization.create({ ...session.createdData, ...input });
    },
    async updateOrganization(obj, { input }, { db, req }) {
      const session = await getSession(req, 'organization.update');

      const { id } = input;

      let data = await db.Organization.findByPk(id);
      if (!data)
        throw new GraphQLError(`Organization with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.update(input);
      return data;
    },
    async deleteOrganization(obj, { id }, { db, req }) {
      const session = await getSession(req, 'organization.delete');

      let data = await db.Organization.findByPk(id);
      if (!data)
        throw new GraphQLError(`Organization with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.destroy();

      return data;
    },
  },
  Organization: {
    /*
        async users(organization, { options }, { db, literal }) {
            return await userLoader.load(organization.userId);
        },
        */
    /*
        async countries(organization, { options }, { db, literal }) {
            return await countryLoader.load(organization.countryId);
        },
        */
  },
};
