import { DataTypes } from 'sequelize';
import sequelize from '#config/database';
import BaseModel from '#shared/BaseModel';
import { addAuditHooksToModel } from '#auth';

class Price extends BaseModel {
  static associate(models) {
    models.Price.belongsTo(models.Organization, {
      constraints: false,
      foreignKey: {
        allowNull: false,
      },
    });
    models.Price.belongsTo(models.Concept, {
      constraints: false,
      foreignKey: {
        allowNull: false,
      },
    });
    models.Price.belongsTo(models.Vendor, {
      constraints: false,
      foreignKey: {
        allowNull: false,
      },
    });
    models.Price.belongsTo(models.Region, {
      constraints: false,
      foreignKey: {
        allowNull: false,
      },
    });
  }

  static addAuditHooks(models) {
    addAuditHooksToModel(models.Price, [
      {
        model: models.Organization,
        field: 'organizationId',
        attributes: ['id', 'name'],
      },
      {
        model: models.Concept,
        field: 'conceptId',
        attributes: ['id', 'code'],
      },
      {
        model: models.Vendor,
        field: 'vendorId',
        attributes: ['id', 'name'],
      },
      {
        model: models.Region,
        field: 'regionId',
        attributes: ['id', 'name'],
      },
    ]);
  }
}

Price.init(
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
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'price',
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

export default Price;
