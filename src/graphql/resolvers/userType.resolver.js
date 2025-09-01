import { GraphQLError } from 'graphql';
import { getSession } from '#auth/index';
import { organizationLoader } from '#loaders';

export default {
  Query: {
    async userTypes(obj, { options }, { db, req }) {
      const session = await getSession(req, ['userType.read']);

      return await db.UserType.findAndCountAllByPage({
        ...options,
        scopes: [{ method: ['byUserType', session.session] }],
      });
    },
    async userType(obj, { id }, { db, req }) {
      const session = await getSession(req, ['userType.read']);

      let data = await db.UserType.findByPk(id, {
        scopes: [{ method: ['byUserType', session.session] }],
      });

      if (!data)
        throw new GraphQLError(`UserType with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      return data;
    },
  },
  Mutation: {
    async createUserType(obj, { input }, { db, req }) {
      const session = await getSession(req, ['userType.create']);

      return await db.UserType.create(
        { ...session.createdData, ...input },
        {
          createdBy: session.userData,
        },
      );
    },
    async updateUserType(obj, { input }, { db, req }) {
      const session = await getSession(req, ['userType.update']);

      const { id } = input;

      let data = await db.UserType.findByPk(id, {
        scopes: [{ method: ['byUserType', session.session] }],
      });
      if (!data)
        throw new GraphQLError(`UserType with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.update(input, {
        createdBy: session.userData,
      });
      return data;
    },
    async deleteUserType(obj, { id }, { db, req }) {
      const session = await getSession(req, ['userType.delete']);

      let data = await db.UserType.findByPk(id, {
        scopes: [{ method: ['byUserType', session.session] }],
      });
      if (!data)
        throw new GraphQLError(`UserType with id: ${id} not found`, {
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
  UserType: {},
};
