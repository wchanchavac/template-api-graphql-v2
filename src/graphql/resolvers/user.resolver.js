import { GraphQLError } from 'graphql';
import { getSession } from '#auth/index';
import { organizationLoader } from '#loaders';

export default {
  Query: {
    async me(obj, { options }, { db, req }) {
      const session = await getSession(req);

      const user = await db.User.findByPk(session.sub);

      if (!user)
        throw new GraphQLError('Unauthorized', {
          extensions: {
            code: 'UNAUTHORIZED',
          },
        });

      return user;
    },
    async users(obj, { options }, { db, req }) {
      const session = await getSession(req);

      return await db.User.findAndCountAllByPage(options);
    },
    async user(obj, { id }, { db, req }) {
      const session = await getSession(req);

      let data = await db.User.findByPk(id);
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
      const session = await getSession(req);

      return await db.User.create({ ...session.createdData, ...input });
    },
    async updateUser(obj, { input }, { db, req }) {
      const session = await getSession(req);

      const { id } = input;

      let data = await db.User.findByPk(id);
      if (!data)
        throw new GraphQLError(`User with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.update(input);
      return data;
    },
    async deleteUser(obj, { id }, { db, req }) {
      const session = await getSession(req);

      let data = await db.User.findByPk(id);
      if (!data)
        throw new GraphQLError(`User with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.destroy();

      return data;
    },
  },
  User: {
    async organization(user, { options }, { db, literal }) {
      return await organizationLoader.load(user.organizationId);
    },
  },
};
