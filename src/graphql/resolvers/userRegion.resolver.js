import { GraphQLError } from 'graphql';
import { getSession } from '#auth/index';
import { userLoader, regionLoader } from '#loaders';

export default {
  Query: {
    async userRegions(obj, { options }, { db, req }) {
      await getSession(req);

      return await db.UserRegion.findAndCountAllByPage(options);
    },
    async userRegion(obj, { id }, { db, req }) {
      await getSession(req);

      let data = await db.UserRegion.findByPk(id);
      if (!data)
        throw new GraphQLError(`UserRegion with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      return data;
    },
  },
  Mutation: {
    async createUserRegion(obj, { input }, { db, req }) {
      const session = await getSession(req);

      return await db.UserRegion.create(
        { ...session.createdData, ...input },
        {
          createdBy: session.userData,
        },
      );
    },
    async updateUserRegion(obj, { input }, { db, req }) {
      const session = await getSession(req);

      const { id } = input;

      let data = await db.UserRegion.findByPk(id);
      if (!data)
        throw new GraphQLError(`UserRegion with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.update(input, {
        createdBy: session.userData,
      });
      return data;
    },
    async deleteUserRegion(obj, { id }, { db, req }) {
      const session = await getSession(req);

      let data = await db.UserRegion.findByPk(id);
      if (!data)
        throw new GraphQLError(`UserRegion with id: ${id} not found`, {
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
  UserRegion: {
    // async user(userRegion) {
    //   return await userLoader.load(userRegion.userId);
    // },
    async region(userRegion) {
      return await regionLoader.load(userRegion.regionId);
    },
  },
};
