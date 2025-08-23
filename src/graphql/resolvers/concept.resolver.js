import { GraphQLError } from 'graphql';
import { getSession } from '#auth';

export default {
  Query: {
    async concepts(obj, { options }, { db, req }) {
      const session = await getSession(req);

      return await db.Concept.findAndCountAllByPage(options);
    },
    async concept(obj, { id }, { db, req }) {
      const session = await getSession(req);

      let data = await db.Concept.findByPk(id);
      if (!data)
        throw new GraphQLError(`Concept with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      return data;
    },
  },
  Mutation: {
    async createConcept(obj, { input }, { db, req }) {
      const session = await getSession(req);

      return await db.Concept.create({ ...session.createdData, ...input });
    },
    async updateConcept(obj, { input }, { db, req }) {
      const session = await getSession(req);

      const { id } = input;

      let data = await db.Concept.findByPk(id);
      if (!data)
        throw new GraphQLError(`Concept with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.update(input);
      return data;
    },
    async deleteConcept(obj, { id }, { db, req }) {
      const session = await getSession(req);

      let data = await db.Concept.findByPk(id);
      if (!data)
        throw new GraphQLError(`Concept with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.destroy();

      return data;
    },
  },
  Concept: {},
};
