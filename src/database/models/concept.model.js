import { DataTypes } from 'sequelize';
import sequelize from '#config/database';
import BaseModel from '#shared/BaseModel';
import { addAuditHooksToModel } from '#auth';

class Concept extends BaseModel {
  static associate(models) {
    models.Concept.belongsTo(models.Organization, {
      constraints: false,
      foreignKey: {
        allowNull: false,
      },
    });
    models.Concept.belongsTo(models.Process, {
      constraints: false,
      foreignKey: {
        allowNull: false,
      },
    });
    models.Concept.belongsTo(models.ServiceType, {
      constraints: false,
      foreignKey: {
        allowNull: false,
      },
    });
    models.Concept.belongsTo(models.Service, {
      constraints: false,
      foreignKey: {
        allowNull: false,
      },
    });
    models.Concept.belongsTo(models.MeasurementUnit, {
      constraints: false,
      foreignKey: {
        allowNull: false,
      },
    });
    models.Concept.belongsTo(models.Currency, {
      constraints: false,
      foreignKey: {
        allowNull: false,
      },
    });
  }

  static addAuditHooks(models) {
    addAuditHooksToModel(models.Concept, [
      {
        model: models.Organization,
        field: 'organizationId',
        attributes: ['id', 'name'],
      },
      {
        model: models.Service,
        field: 'serviceId',
        attributes: ['id', 'name'],
      },
      {
        model: models.ServiceType,
        field: 'serviceTypeId',
      },
      {
        model: models.Process,
        field: 'processId',
        attributes: ['id', 'name'],
      },

      {
        model: models.MeasurementUnit,
        field: 'measurementUnitId',
        attributes: ['id', 'name'],
      },

      {
        model: models.Currency,
        field: 'currencyId',
        attributes: ['id', 'name'],
      },
    ]);
  }
}

Concept.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    //    createdBy: {
    //      type: DataTypes.UUID,
    //      allowNull: true,
    //   },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'concept',
    freezeTableName: true,
    paranoid: true,
    defaultScope: {
      attributes: {
        exclude: ['updatedAt', 'deletedAt'],
      },
    },
    scopes: {
      byOrganization({ organizationId }) {
        return {
          where: {
            organizationId,
          },
        };
      },
    },
  },
);

export default Concept;
