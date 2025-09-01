import { GraphQLError } from 'graphql';
import { getSession } from '#auth';

export default {
  Query: {
    async stages(obj, { options }, { db, req }) {
      const session = await getSession(req, 'stage.read');

      return await db.Stage.findAndCountAllByPage(options);
    },
    async stage(obj, { id }, { db, req }) {
      const session = await getSession(req, 'stage.read');

      let data = await db.Stage.findByPk(id);
      if (!data)
        throw new GraphQLError(`Stage with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      return data;
    },
  },
  Mutation: {
    async createStage(obj, { input }, { db, req }) {
      const session = await getSession(req, 'stage.create');

      return await db.Stage.create({ ...session.createdData, ...input });
    },
    async updateStage(obj, { input }, { db, req }) {
      const session = await getSession(req, 'stage.update');

      const { id } = input;

      let data = await db.Stage.findByPk(id);
      if (!data)
        throw new GraphQLError(`Stage with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.update(input);
      return data;
    },
    async deleteStage(obj, { id }, { db, req }) {
      const session = await getSession(req, 'stage.delete');

      let data = await db.Stage.findByPk(id);
      if (!data)
        throw new GraphQLError(`Stage with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.destroy();

      return data;
    },
  },
  Stage: {},
};
