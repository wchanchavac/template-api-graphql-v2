import { GraphQLError } from 'graphql';
import { getSession } from '#auth/index';
import {
  organizationLoader,
  userRegionByUserLoader,
  userTypeLoader,
  vendorLoader,
} from '#loaders';

export default {
  Query: {
    async me(obj, { options }, { db, req }) {
      const session = await getSession(req, 'user.read');

      const user = await db.User.findByPk(session.userData.id);

      if (!user)
        throw new GraphQLError('Unauthorized', {
          extensions: {
            code: 'UNAUTHORIZED',
          },
        });

      return user;
    },
    async users(obj, { options }, { db, req }) {
      const session = await getSession(req, 'user.read');

      return await db.User.findAndCountAllByPage({
        ...options,
        scopes: [{ method: ['byOrganization', session.session] }],
      });
    },
    async user(obj, { id }, { db, req }) {
      const session = await getSession(req, 'user.read');

      let data = await db.User.findByPk(id, {
        scopes: [{ method: ['byOrganization', session.session] }],
      });
      if (!data)
        throw new GraphQLError(`User with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      return data;
    },
  },
  Mutation: {
    async createUser(obj, { input }, { db, req }) {
      const session = await getSession(req, 'user.create');

      const { regions } = input;

      const user = await db.User.create(
        { ...session.createdData, ...input },
        {
          createdBy: session.userData,
        },
      );

      if (Array.isArray(regions)) {
        const regionsIds = await db.Region.findAll({
          attributes: ['id'],
          where: {
            id: regions,
          },
        });

        await user.setRegions(regionsIds);
      }

      return user;
    },
    async updateUser(obj, { input }, { db, req }) {
      const session = await getSession(req, 'user.update');

      const { id, regions } = input;

      let user = await db.User.findByPk(id, {
        scopes: [{ method: ['byOrganization', session.session] }],
      });
      if (!user)
        throw new GraphQLError(`User with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });

      await user.update(input, {
        createdBy: session.userData,
      });

      if (Array.isArray(regions)) {
        const regionsIds = await db.Region.findAll({
          attributes: ['id'],
          where: {
            id: regions,
          },
        });

        await user.setRegions(regionsIds);
      }

      return user;
    },
    async deleteUser(obj, { id }, { db, req }) {
      const session = await getSession(req, 'user.delete');

      let data = await db.User.findByPk(id, {
        scopes: [{ method: ['byOrganization', session.session] }],
      });
      if (!data)
        throw new GraphQLError(`User with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.destroy({
        createdBy: session.userData,
      });

      return data;
    },
  },
  User: {
    async organization(user, { options }, { db, literal }) {
      return await organizationLoader.load(user.organizationId);
    },
    async regions(user, { options }, { db, literal }) {
      return await userRegionByUserLoader.load(user.id);
    },
    async userType(user, { options }, { db, literal }) {
      return await userTypeLoader.load(user.userTypeId);
    },
    async vendor(user, { options }, { db, literal }) {
      if (!user.vendorId) return null;
      return await vendorLoader.load(user.vendorId);
    },
  },
};
