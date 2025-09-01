import { GraphQLError } from 'graphql';
import { getSession } from '#auth';
import {
  currencyLoader,
  measurementUnitLoader,
  processLoader,
  serviceLoader,
  serviceTypeLoader,
} from '#loaders';

export default {
  Query: {
    async concepts(obj, { options }, { db, req }) {
      const session = await getSession(req, 'concept.read');

      return await db.Concept.findAndCountAllByPage({
        ...options,
        scopes: [{ method: ['byOrganization', session.session] }],
      });
    },
    async concept(obj, { id }, { db, req }) {
      const session = await getSession(req, 'concept.read');

      let data = await db.Concept.findByPk(id, {
        scopes: [{ method: ['byOrganization', session.session] }],
      });
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
      const session = await getSession(req, 'concept.create');

      return await db.Concept.create({ ...session.createdData, ...input });
    },
    async updateConcept(obj, { input }, { db, req }) {
      const session = await getSession(req, 'concept.update');

      const { id } = input;

      let data = await db.Concept.findByPk(id, {
        scopes: [{ method: ['byOrganization', session.session] }],
      });
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
      const session = await getSession(req, 'concept.delete');

      let data = await db.Concept.findByPk(id, {
        scopes: [{ method: ['byOrganization', session.session] }],
      });
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
  Concept: {
    async process(obj, args, { db, req }) {
      return await processLoader.load(obj.processId);
    },
    async serviceType(obj, args, { db, req }) {
      return await serviceTypeLoader.load(obj.serviceTypeId);
    },
    async service(obj, args, { db, req }) {
      return await serviceLoader.load(obj.serviceId);
    },
    async measurementUnit(obj, args, { db, req }) {
      return await measurementUnitLoader.load(obj.measurementUnitId);
    },
    async currency(obj, args, { db, req }) {
      return await currencyLoader.load(obj.currencyId);
    },
  },
};
