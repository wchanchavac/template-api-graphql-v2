import { GraphQLError } from 'graphql';
import { getSession } from '#auth';

export default {
  Query: {
    async specialities(obj, { options }, { db, req }) {
      const session = await getSession(req, ['speciality.read']);

      return await db.Speciality.findAndCountAllByPage({
        ...options,
        scopes: [{ method: ['byOrganization', session.session] }],
      });
    },
    async speciality(obj, { id }, { db, req }) {
      const session = await getSession(req, ['speciality.read']);

      let data = await db.Speciality.findByPk(id, {
        scopes: [{ method: ['byOrganization', session.session] }],
      });
      if (!data)
        throw new GraphQLError(`Speciality with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      return data;
    },
  },
  Mutation: {
    async createSpeciality(obj, { input }, { db, req }) {
      const session = await getSession(req, ['speciality.create']);

      return await db.Speciality.create({ ...session.createdData, ...input });
    },
    async updateSpeciality(obj, { input }, { db, req }) {
      const session = await getSession(req, ['speciality.update']);

      const { id } = input;

      let data = await db.Speciality.findByPk(id, {
        scopes: [{ method: ['byOrganization', session.session] }],
      });
      if (!data)
        throw new GraphQLError(`Speciality with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.update(input);
      return data;
    },
    async deleteSpeciality(obj, { id }, { db, req }) {
      const session = await getSession(req, ['speciality.delete']);

      let data = await db.Speciality.findByPk(id, {
        scopes: [{ method: ['byOrganization', session.session] }],
      });
      if (!data)
        throw new GraphQLError(`Speciality with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.destroy();

      return data;
    },
  },
  Speciality: {},
};
