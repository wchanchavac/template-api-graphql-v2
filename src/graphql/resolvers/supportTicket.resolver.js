import { GraphQLError } from 'graphql';
import { getSession } from '#auth';
import {
  organizationLoader,
  processLoader,
  stageLoader,
  siteLoader,
  vendorLoader,
  quoteLoader,
  quoteBySiteLoader,
} from '#loaders';

export default {
  Query: {
    async supportTickets(obj, { options }, { db, req }) {
      const session = await getSession(req);

      return await db.SupportTicket.findAndCountAllByPage(options);
    },
    async supportTicket(obj, { id }, { db, req }) {
      const session = await getSession(req);

      let data = await db.SupportTicket.findByPk(id);
      if (!data)
        throw new GraphQLError(`SupportTicket with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      return data;
    },
  },
  Mutation: {
    async createSupportTicket(obj, { input }, { db, req }) {
      const session = await getSession(req);

      return await db.SupportTicket.create({
        ...session.createdData,
        ...input,
      });
    },
    async updateSupportTicket(obj, { input }, { db, req }) {
      const session = await getSession(req);

      const { id } = input;

      let data = await db.SupportTicket.findByPk(id);
      if (!data)
        throw new GraphQLError(`SupportTicket with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.update(input);
      return data;
    },
    async deleteSupportTicket(obj, { id }, { db, req }) {
      const session = await getSession(req);

      let data = await db.SupportTicket.findByPk(id);
      if (!data)
        throw new GraphQLError(`SupportTicket with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.destroy();

      return data;
    },
  },
  SupportTicket: {
    async organization(supportTicket, { options }, { db, literal }) {
      return await organizationLoader.load(supportTicket.organizationId);
    },
    async process(supportTicket, { options }, { db, literal }) {
      return await processLoader.load(supportTicket.processId);
    },
    async stage(supportTicket, { options }, { db, literal }) {
      return await stageLoader.load(supportTicket.stageId);
    },
    async site(supportTicket, { options }, { db, literal }) {
      return await siteLoader.load(supportTicket.siteId);
    },
    async vendor(supportTicket, { options }, { db, literal }) {
      return await vendorLoader.load(supportTicket.vendorId);
    },
    async quotes(supportTicket, { options }, { db, literal }) {
      return await quoteBySiteLoader.load(supportTicket.id);
    },
  },
};
