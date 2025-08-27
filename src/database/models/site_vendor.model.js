import { DataTypes } from 'sequelize';
import sequelize from '#config/database';
import BaseModel from '#shared/BaseModel';

class SiteVendor extends BaseModel {
  static associate(models) {
    models.SiteVendor.belongsTo(models.Site, {
      constraints: false,
      foreignKey: {
        allowNull: false,
        name: 'siteId',
      },
    });

    models.SiteVendor.belongsTo(models.Vendor, {
      constraints: false,
      foreignKey: {
        allowNull: false,
        name: 'vendorId',
      },
    });
  }
}

SiteVendor.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    isDefault: {
      type: DataTypes.BOOLEAN,
      comment: '',
      defaultValue: false,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'site_vendor',
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

export default SiteVendor;
