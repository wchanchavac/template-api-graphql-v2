import { GraphQLError } from 'graphql';
import { getSession } from '#auth';

export default {
  Query: {
    async jobs(obj, { options }, { db, req }) {
      const session = await getSession(req);

      return await db.Job.findAndCountAllByPage(options);
    },
    async job(obj, { id }, { db, req }) {
      const session = await getSession(req);

      let data = await db.Job.findByPk(id);
      if (!data)
        throw new GraphQLError(`Job with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      return data;
    },
  },
  Mutation: {
    async createJob(obj, { input }, { db, req }) {
      const session = await getSession(req);

      return await db.Job.create({ ...session.createdData, ...input });
    },
    async updateJob(obj, { input }, { db, req }) {
      const session = await getSession(req);

      const { id } = input;

      let data = await db.Job.findByPk(id);
      if (!data)
        throw new GraphQLError(`Job with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.update(input);
      return data;
    },
    async deleteJob(obj, { id }, { db, req }) {
      const session = await getSession(req);

      let data = await db.Job.findByPk(id);
      if (!data)
        throw new GraphQLError(`Job with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.destroy();

      return data;
    },
  },
  Job: {},
};
