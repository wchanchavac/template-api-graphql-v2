import { DataTypes, literal } from 'sequelize';
import sequelize from '#config/database';
import BaseModel from '#shared/BaseModel';
import { addAuditHooksToModel } from '#auth';

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

  static addAuditHooks(models) {
    addAuditHooksToModel(models.SiteVendor, [
      {
        model: models.Organization,
        field: 'organizationId',
        attributes: ['id', 'name'],
      },
    ]);
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
    scopes: {
      byOrganization({ organizationId }) {
        return {
          where: {
            vendorId: [
              literal(
                `SELECT "id" FROM ${process.env.DB_USERNAME}."vendor" WHERE "organizationId" = '${organizationId}' AND "deletedAt" IS NULL`,
              ),
            ],
            siteId: [
              literal(
                `SELECT "id" FROM ${process.env.DB_USERNAME}."site" WHERE "organizationId" = '${organizationId}' AND "deletedAt" IS NULL`,
              ),
            ],
          },
        };
      },
      byRegion({ regionId }) {
        return {
          where: {
            siteId: [
              literal(
                `SELECT "id" FROM ${process.env.DB_USERNAME}."site" WHERE "regionId" = '${regionId}' AND "deletedAt" IS NULL`,
              ),
            ],
          },
        };
      },
    },
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
