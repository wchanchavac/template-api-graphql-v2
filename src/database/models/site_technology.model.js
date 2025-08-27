import { DataTypes } from 'sequelize';
import sequelize from '#config/database';
import BaseModel from '#shared/BaseModel';

class SiteTechnology extends BaseModel {
  static associate(models) {
    models.SiteTechnology.belongsTo(models.Site, {
      constraints: false,
      foreignKey: {
        allowNull: false,
        name: 'siteId',
      },
    });

    models.SiteTechnology.belongsTo(models.Technology, {
      constraints: false,
      foreignKey: {
        allowNull: false,
        name: 'technologyId',
      },
    });
  }
}

SiteTechnology.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    mnemonic: {
      type: DataTypes.STRING,
      comment: '',
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'site_technology',
    freezeTableName: true,
    paranoid: true,
    defaultScope: {
      attributes: {
        exclude: ['updatedAt', 'deletedAt'],
      },
    },
    scopes: {},
    /*indexes: [
				{
					fields: [ "organizationId"],
					name: 'technology_organization_id_idx',
					using: 'BTREE',
				},
		], */
  },
);

// Use this to add auth methods to the model
// addAuthMethodsToModel(Technology, { field: 'password' });
// this add authenticate and changePassword methods to the model
// and a hook to hash the password before saving

export default SiteTechnology;
