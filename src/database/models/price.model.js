import { DataTypes } from 'sequelize';
import sequelize from '#config/database';
import BaseModel from '#shared/BaseModel';

class Price extends BaseModel {
  static associate(models) {
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
    models.Price.belongsTo(models.Organization, {
      constraints: false,
      foreignKey: {
        allowNull: false,
      },
    });
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
    createdBy: {
      type: DataTypes.UUID,
      allowNull: true,
    },
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
