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
  fuelQuoteBySupportTicketLoader,
} from '#loaders';

const ABASTECIMIENTO_DE_COMBUSTIBLE = '5dad4da5-a13b-4283-9754-c0d911379f68'; // 'Abastecimiento de combustible'
const MANTENIMIENTO_CORRECTIVO = 'b053c9ae-58ba-4848-8582-3c162eb54b42'; // 'Mantenimiento correctivo'
const MANTENIMIENTO_PREVENTIVO = 'af194a73-f581-4b04-8802-b0c1aeea332b'; // 'Mantenimiento preventivo'

const COTIZACION = '4f49b243-0fc9-4528-b10e-72e4321aed99';
const ENVIADO_A_PROVEEDOR = '54a8de61-dea3-4ddf-835b-b4f215e9f92b';
const EN_PROCESO = '55142dd7-c16c-49fb-899e-a085e56a5ac5';
const APROBACION_POR_PROVEEDOR = '2b6d08e5-ff16-41e1-918c-1844b4a2cf03';
const VALIDACION_POR_ANALISTA = '7b7b675f-a939-48d9-ad0f-afaae9bd744c';
const FINALIZADO = '446c4964-86bf-4fd1-a689-a497015982a7';

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

      // '4f49b243-0fc9-4528-b10e-72e4321aed99'
      const { processId } = input;
      if (
        [MANTENIMIENTO_CORRECTIVO, MANTENIMIENTO_PREVENTIVO].includes(processId)
      ) {
        input.stageId = COTIZACION;
      }

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
      if (!supportTicket.stageId) return null;
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
    async fuelQuotes(supportTicket, { options }, { db, literal }) {
      return await fuelQuoteBySupportTicketLoader.load(supportTicket.id);
    },
  },
};
