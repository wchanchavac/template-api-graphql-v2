import { GraphQLError } from 'graphql';
import { getSession } from '#auth';

export default {
  Query: {
    async measurementUnits(obj, { options }, { db, req }) {
      const session = await getSession(req, ['measurementUnit.read']);

      return await db.MeasurementUnit.findAndCountAllByPage(options);
    },
    async measurementUnit(obj, { id }, { db, req }) {
      const session = await getSession(req, ['measurementUnit.read']);

      let data = await db.MeasurementUnit.findByPk(id);
      if (!data)
        throw new GraphQLError(`MeasurementUnit with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      return data;
    },
  },
  Mutation: {
    async createMeasurementUnit(obj, { input }, { db, req }) {
      const session = await getSession(req, ['measurementUnit.create']);

      return await db.MeasurementUnit.create({
        ...session.createdData,
        ...input,
      });
    },
    async updateMeasurementUnit(obj, { input }, { db, req }) {
      const session = await getSession(req, ['measurementUnit.update']);

      const { id } = input;

      let data = await db.MeasurementUnit.findByPk(id);
      if (!data)
        throw new GraphQLError(`MeasurementUnit with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.update(input);
      return data;
    },
    async deleteMeasurementUnit(obj, { id }, { db, req }) {
      const session = await getSession(req, ['measurementUnit.delete']);

      let data = await db.MeasurementUnit.findByPk(id);
      if (!data)
        throw new GraphQLError(`MeasurementUnit with id: ${id} not found`, {
          extensions: {
            code: 'NOT_FOUND',
          },
        });
      await data.destroy();

      return data;
    },
  },
  MeasurementUnit: {},
};
