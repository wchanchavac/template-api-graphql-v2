import { GraphQLError } from 'graphql';
import { getSession } from '../../auth/index.js';
import { organizationLoader } from '../../loaders/index.js';

export default {
  Query: {
    async servers(obj, { options }, { db, req }) {
      const session = await getSession(req);

      return await db.Server.findAndCountAllByPage(options);
    },
    async server(obj, { id }, { db, req }) {
      const session = await getSession(req);

      let data = await db.Server.findByPk(id);
      if (!data)
        throw new GraphQLError(`Server with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      return data;
    },
  },
  Mutation: {
    async createServer(obj, { input }, { db, req }) {
      const session = await getSession(req);

      return await db.Server.create({ ...input });
    },
    async updateServer(obj, { input }, { db, req }) {
      const session = await getSession(req);

      const { id } = input;

      let data = await db.Server.findByPk(id);
      if (!data)
        throw new GraphQLError(`Server with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.update(input);
      return data;
    },
    async deleteServer(obj, { id }, { db, req }) {
      const session = await getSession(req);

      let data = await db.Server.findByPk(id);
      if (!data)
        throw new GraphQLError(`Server with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.destroy();

      return data;
    },
  },
  Server: {
    async organization(server, { options }, { db, literal }) {
      return await organizationLoader.load(server.organizationId);
    },
  },
};
