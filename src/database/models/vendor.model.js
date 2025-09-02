import { addAuditHooksToModel } from '#auth';
import sequelize from '#config/database';
import BaseModel from '#shared/BaseModel';
import { DataTypes, literal } from 'sequelize';

class Vendor extends BaseModel {
  static associate(models) {
    models.Vendor.belongsTo(models.Organization, {
      constraints: false,
      foreignKey: {
        allowNull: false,
      },
    });

    models.Vendor.belongsToMany(models.Site, {
      constraints: false,
      foreignKey: {
        allowNull: true,
        name: 'vendorId',
      },
      through: {
        model: models.SiteVendor,
        unique: false,
      },
    });
  }

  static addAuditHooks(models) {
    addAuditHooksToModel(models.Vendor, [
      {
        model: models.Organization,
        field: 'organizationId',
        attributes: ['id', 'name'],
      },
    ]);
  }
}

Vendor.init(
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
    name: {
      type: DataTypes.STRING,
      comment: '',
      allowNull: false,
    },
    abbreviation: {
      type: DataTypes.STRING,
      comment: '',
      allowNull: true,
    },
    rfc: {
      type: DataTypes.STRING,
      comment: '',
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      comment: '',
      allowNull: true,
    },
    phones: {
      type: DataTypes.JSON,
      comment: '',
      allowNull: true,
      defaultValue: [],
      // set(val) {
      //   let phones = this.getDataValue('phones');
      //   this.setDataValue('phones', merge([], phones, val));
      // },
    },
    image: {
      type: DataTypes.STRING,
      comment: '',
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      comment: '',
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: 'vendor',
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
      byRegion({ regionId }) {
        if (regionId === 'ALL') {
          return {};
        }

        return {
          where: {
            id: [
              literal(
                `SELECT "vendorId" FROM ${process.env.DB_USERNAME}."site_vendor" WHERE "siteId" IN (SELECT "id" FROM ${process.env.DB_USERNAME}."site" WHERE "regionId" = '${regionId}' AND "deletedAt" IS NULL) AND "deletedAt" IS NULL`,
              ),
            ],
          },
        };
      },
    },
    /*indexes: [
				{
					fields: [ "organizationId"],
					name: 'vendor_organization_id_idx',
					using: 'BTREE',
				},
		], */
  },
);

// Use this to add auth methods to the model
// addAuthMethodsToModel(Vendor, { field: 'password' });
// this add authenticate and changePassword methods to the model
// and a hook to hash the password before saving

export default Vendor;
