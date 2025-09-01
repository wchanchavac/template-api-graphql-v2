import { GraphQLError } from 'graphql';
import { getSession } from '#auth';
import { zoneLoader } from '#loaders';

export default {
  Query: {
    async subzones(obj, { options }, { db, req }) {
      const session = await getSession(req, 'subzone.read');

      return await db.Subzone.findAndCountAllByPage({
        ...options,
        scopes: [{ method: ['byOrganization', session.session] }],
      });
    },
    async subzone(obj, { id }, { db, req }) {
      const session = await getSession(req, 'subzone.read');

      let data = await db.Subzone.findByPk(id, {
        scopes: [{ method: ['byOrganization', session.session] }],
      });
      if (!data)
        throw new GraphQLError(`Subzone with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      return data;
    },
  },
  Mutation: {
    async createSubzone(obj, { input }, { db, req }) {
      const session = await getSession(req, 'subzone.create');

      return await db.Subzone.create(
        { ...session.createdData, ...input },
        {
          createdBy: session.userData,
        },
      );
    },
    async updateSubzone(obj, { input }, { db, req }) {
      const session = await getSession(req, 'subzone.update');

      const { id } = input;

      let data = await db.Subzone.findByPk(id, {
        scopes: [{ method: ['byOrganization', session.session] }],
      });
      if (!data)
        throw new GraphQLError(`Subzone with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.update(input, {
        createdBy: session.userData,
      });
      return data;
    },
    async deleteSubzone(obj, { id }, { db, req }) {
      const session = await getSession(req, 'subzone.delete');

      let data = await db.Subzone.findByPk(id, {
        scopes: [{ method: ['byOrganization', session.session] }],
      });
      if (!data)
        throw new GraphQLError(`Subzone with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.destroy({
        createdBy: session.userData,
      });

      return data;
    },
  },
  Subzone: {
    async zone(subzone, { options }, { db, literal }) {
      return await zoneLoader.load(subzone.zoneId);
    },
  },
};
