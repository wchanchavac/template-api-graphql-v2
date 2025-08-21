import { DataTypes } from 'sequelize';
import sequelize from '#config/database';
import BaseModel from '#shared/BaseModel';

class Organization extends BaseModel {
  static associate(models) {
    models.Organization.hasMany(models.User, {
      constraints: false,
      foreignKey: {
        allowNull: true,
      },
    });
    models.Organization.hasMany(models.Country, {
      constraints: false,
      foreignKey: {
        allowNull: true,
      },
    });
  }
}

Organization.init(
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
    name: {
      type: DataTypes.STRING,
      comment: '',
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'organization',
    freezeTableName: true,
    paranoid: true,
    defaultScope: {
      attributes: {
        exclude: ['updatedAt', 'deletedAt'],
      },
    },
    scopes: {},
    /*indexes: [
		], */
  },
);

// Use this to add auth methods to the model
// addAuthMethodsToModel(Organization, { field: 'password' });
// this add authenticate and changePassword methods to the model
// and a hook to hash the password before saving

export default Organization;
