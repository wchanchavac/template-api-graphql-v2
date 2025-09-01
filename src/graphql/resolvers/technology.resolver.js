import { getSession } from '#auth';
// import { siteTechnologyByTechnologyLoader } from '#loaders';
import { GraphQLError } from 'graphql';

export default {
  Query: {
    async technologies(obj, { options }, { db, req }) {
      const session = await getSession(req, 'technology.read');

      return await db.Technology.findAndCountAllByPage(options);
    },
    async technology(obj, { id }, { db, req }) {
      const session = await getSession(req, 'technology.read');

      let data = await db.Technology.findByPk(id);
      if (!data)
        throw new GraphQLError(`Technology with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      return data;
    },
  },
  Mutation: {
    async createTechnology(obj, { input }, { db, req }) {
      const session = await getSession(req, 'technology.create');

      return await db.Technology.create({ ...session.createdData, ...input });
    },
    async updateTechnology(obj, { input }, { db, req }) {
      const session = await getSession(req, 'technology.update');

      const { id } = input;

      let data = await db.Technology.findByPk(id);
      if (!data)
        throw new GraphQLError(`Technology with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.update(input);
      return data;
    },
    async deleteTechnology(obj, { id }, { db, req }) {
      const session = await getSession(req, 'technology.delete');

      let data = await db.Technology.findByPk(id);
      if (!data)
        throw new GraphQLError(`Technology with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.destroy();

      return data;
    },
  },
  Technology: {
    // async sites(technology, { options }, { db, literal }) {
    //   return await siteTechnologyByTechnologyLoader.load(technology.id);
    // },
  },
};
