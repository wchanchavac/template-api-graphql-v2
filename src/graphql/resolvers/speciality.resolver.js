import { GraphQLError } from 'graphql';
import { getSession } from '../../auth/index.js';
import { organizationLoader } from '../../loaders/index.js';

export default {
  Query: {
    async specialities(obj, { options }, { db, req }) {
      const session = await getSession(req);

      return await db.Speciality.findAndCountAllByPage(options);
    },
    async speciality(obj, { id }, { db, req }) {
      const session = await getSession(req);

      let data = await db.Speciality.findByPk(id);
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
      const session = await getSession(req);

      return await db.Speciality.create({ ...input, ...session });
    },
    async updateSpeciality(obj, { input }, { db, req }) {
      const session = await getSession(req);

      const { id } = input;

      let data = await db.Speciality.findByPk(id);
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
      const session = await getSession(req);

      let data = await db.Speciality.findByPk(id);
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
