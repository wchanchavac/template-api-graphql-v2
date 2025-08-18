import { GraphQLError } from 'graphql';
import { getSession } from '../../auth/index.js';
import { organizationLoader } from '../../loaders/index.js';

export default {
  Query: {
    async departments(obj, { options }, { db, req }) {
      const session = await getSession(req);

      return await db.Department.findAndCountAllByPage(options);
    },
    async department(obj, { id }, { db, req }) {
      const session = await getSession(req);

      let data = await db.Department.findByPk(id);
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
      const session = await getSession(req);

      return await db.Department.create({ ...input });
    },
    async updateDepartment(obj, { input }, { db, req }) {
      const session = await getSession(req);

      const { id } = input;

      let data = await db.Department.findByPk(id);
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
      const session = await getSession(req);

      let data = await db.Department.findByPk(id);
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
  Department: {
    async organization(department, { options }, { db, literal }) {
      return await organizationLoader.load(department.organizationId);
    },
  },
};
