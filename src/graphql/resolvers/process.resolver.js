import { GraphQLError } from 'graphql';
import { getSession } from '#auth';

export default {
  Query: {
    async processes(obj, { options }, { db, req }) {
      const session = await getSession(req);

      return await db.Process.findAndCountAllByPage(options);
    },
    async process(obj, { id }, { db, req }) {
      const session = await getSession(req);

      let data = await db.Process.findByPk(id);
      if (!data)
        throw new GraphQLError(`Process with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      return data;
    },
  },
  Mutation: {
    async createProcess(obj, { input }, { db, req }) {
      const session = await getSession(req);

      return await db.Process.create({ ...session.createdData, ...input });
    },
    async updateProcess(obj, { input }, { db, req }) {
      const session = await getSession(req);

      const { id } = input;

      let data = await db.Process.findByPk(id);
      if (!data)
        throw new GraphQLError(`Process with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.update(input);
      return data;
    },
    async deleteProcess(obj, { id }, { db, req }) {
      const session = await getSession(req);

      let data = await db.Process.findByPk(id);
      if (!data)
        throw new GraphQLError(`Process with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.destroy();

      return data;
    },
  },
  Process: {},
};
