import { GraphQLError } from 'graphql';
import { getSession } from '#auth';

export default {
  Query: {
    async departments(obj, { options }, { db, req }) {
      const session = await getSession(req, ['department.read']);

      return await db.Department.findAndCountAllByPage({
        ...options,
        scopes: [{ method: ['byOrganization', session.session] }],
      });
    },
    async department(obj, { id }, { db, req }) {
      const session = await getSession(req, ['department.read']);

      let data = await db.Department.findByPk(id, {
        scopes: [{ method: ['byOrganization', session.session] }],
      });
      if (!data)
        throw new GraphQLError(`Department with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      return data;
    },
  },
  Mutation: {
    async createDepartment(obj, { input }, { db, req }) {
      const session = await getSession(req, ['department.create']);

      return await db.Department.create({ ...session.createdData, ...input });
    },
    async updateDepartment(obj, { input }, { db, req }) {
      const session = await getSession(req, ['department.update']);

      const { id } = input;

      let data = await db.Department.findByPk(id, {
        scopes: [{ method: ['byOrganization', session.session] }],
      });
      if (!data)
        throw new GraphQLError(`Department with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.update(input);
      return data;
    },
    async deleteDepartment(obj, { id }, { db, req }) {
      const session = await getSession(req, ['department.delete']);

      let data = await db.Department.findByPk(id, {
        scopes: [{ method: ['byOrganization', session.session] }],
      });
      if (!data)
        throw new GraphQLError(`Department with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.destroy();

      return data;
    },
  },
  Department: {},
};
