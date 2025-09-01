import { getSession } from '#auth';
import { fuelQuoteBySupportTicketLoader } from '#loaders';
import { GraphQLError } from 'graphql';

export default {
  Query: {
    async fuelQuotes(obj, { options }, { db, req }) {
      const session = await getSession(req);

      return await db.FuelQuote.findAndCountAllByPage({
        ...options,
        scopes: [{ method: ['byOrganization', session.session] }],
      });
    },
    async fuelQuote(obj, { id }, { db, req }) {
      const session = await getSession(req, ['fuelQuote.read']);

      let data = await db.FuelQuote.findByPk(id, {
        scopes: [{ method: ['byOrganization', session.session] }],
      });
      if (!data)
        throw new GraphQLError(`FuelQuote with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      return data;
    },
    async fuelQuotesBySupportTicket(obj, { supportTicketId }, { db, req }) {
      const session = await getSession(req, ['fuelQuote.read']);

      return await db.FuelQuote.findAll({
        where: {
          supportTicketId,
        },
        sort: [['createdAt', 'DESC']],
      });
    },
  },
  Mutation: {
    async createFuelQuote(obj, { input }, { db, req }) {
      const session = await getSession(req, ['fuelQuote.create']);

      return await db.FuelQuote.create({ ...session.createdData, ...input });
    },
    async updateFuelQuote(obj, { input }, { db, req }) {
      const session = await getSession(req, ['fuelQuote.update']);

      const { id, ...updateData } = input;

      let data = await db.FuelQuote.findByPk(id, {
        scopes: [{ method: ['byOrganization', session.session] }],
      });
      if (!data)
        throw new GraphQLError(`FuelQuote with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });

      await data.update(updateData);
      return data;
    },
    async deleteFuelQuote(obj, { id }, { db, req }) {
      const session = await getSession(req, ['fuelQuote.delete']);

      let data = await db.FuelQuote.findByPk(id, {
        scopes: [{ method: ['byOrganization', session.session] }],
      });
      if (!data)
        throw new GraphQLError(`FuelQuote with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.destroy();

      return data;
    },
  },
  FuelQuote: {},
};
