import { GraphQLError } from 'graphql';
import { getSession } from '#auth';
import {
  serviceTypeLoader,
  serviceLoader,
  conceptLoader,
  measurementUnitLoader,
  priceLoader,
} from '#loaders';

export default {
  Query: {
    async quotes(obj, { options }, { db, req }) {
      const session = await getSession(req, ['quote.read']);

      return await db.Quote.findAndCountAllByPage({
        ...options,
        scopes: [{ method: ['byOrganization', session.session] }],
      });
    },
    async quote(obj, { id }, { db, req }) {
      const session = await getSession(req, ['quote.read']);

      let data = await db.Quote.findByPk(id, {
        scopes: [{ method: ['byOrganization', session.session] }],
      });
      if (!data)
        throw new GraphQLError(`Quote with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      return data;
    },
  },
  Mutation: {
    async createQuote(obj, { input }, { db, req }) {
      const session = await getSession(req, ['quote.create']);

      return await db.Quote.create({
        ...session.createdData,
        ...input,
      });
    },
    async updateQuote(obj, { input }, { db, req }) {
      const session = await getSession(req, ['quote.update']);

      const { id } = input;

      let data = await db.Quote.findByPk(id, {
        scopes: [{ method: ['byOrganization', session.session] }],
      });
      if (!data)
        throw new GraphQLError(`Quote with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.update(input);
      return data;
    },
    async deleteQuote(obj, { id }, { db, req }) {
      const session = await getSession(req, ['quote.delete']);

      let data = await db.Quote.findByPk(id, {
        scopes: [{ method: ['byOrganization', session.session] }],
      });
      if (!data)
        throw new GraphQLError(`Quote with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.destroy();

      return data;
    },
  },
  Quote: {
    // async organization(quote, { options }, { db, literal }) {
    //   return await organizationLoader.load(quote.organizationId);
    // },
    // async supportTicket(quote, { options }, { db, literal }) {
    //   return await supportTicketLoader.load(quote.supportTicketId);
    // },
    async serviceType(quote, { options }, { db, literal }) {
      return await serviceTypeLoader.load(quote.serviceTypeId);
    },
    async service(quote, { options }, { db, literal }) {
      return await serviceLoader.load(quote.serviceId);
    },
    async concept(quote, { options }, { db, literal }) {
      return await conceptLoader.load(quote.conceptId);
    },
    async measurementUnit(quote, { options }, { db, literal }) {
      return await measurementUnitLoader.load(quote.measurementUnitId);
    },
    async price(quote, { options }, { db, literal }) {
      return await priceLoader.load(quote.priceId);
    },
    // async site(quote, { options }, { db, literal }) {
    //   return await siteLoader.load(quote.siteId);
    // },
  },
};
