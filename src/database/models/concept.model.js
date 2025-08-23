import { DataTypes } from 'sequelize';
import sequelize from '#config/database';
import BaseModel from '#shared/BaseModel';

class Concept extends BaseModel {
  static associate(models) {
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
}

Concept.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.UUID,
      allowNull: true,
    },
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
    scopes: {},
  },
);

export default Concept;
