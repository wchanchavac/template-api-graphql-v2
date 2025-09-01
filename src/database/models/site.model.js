import { DataTypes } from 'sequelize';
import sequelize from '#config/database';
import BaseModel from '#shared/BaseModel';

class Site extends BaseModel {
  static associate(models) {
    models.Site.belongsTo(models.Organization, {
      constraints: false,
      foreignKey: {
        allowNull: false,
      },
    });
    models.Site.belongsTo(models.Region, {
      constraints: false,
      foreignKey: {
        allowNull: false,
      },
    });
    models.Site.belongsTo(models.Zone, {
      constraints: false,
      foreignKey: {
        allowNull: false,
      },
    });
    models.Site.belongsTo(models.Subzone, {
      constraints: false,
      foreignKey: {
        allowNull: false,
      },
    });
    models.Site.belongsTo(models.Area, {
      constraints: false,
      foreignKey: {
        allowNull: false,
      },
    });
    models.Site.belongsTo(models.State, {
      constraints: false,
      foreignKey: {
        allowNull: false,
      },
    });
    models.Site.belongsToMany(models.Vendor, {
      constraints: false,
      foreignKey: {
        allowNull: true,
        name: 'siteId',
      },
      through: {
        model: models.SiteVendor,
        unique: false,
      },
    });

    models.Site.belongsTo(models.User, {
      constraints: false,
      foreignKey: {
        allowNull: true,
        name: 'analystId',
      },
      as: 'analyst',
    });

    models.Site.belongsTo(models.User, {
      constraints: false,
      foreignKey: {
        allowNull: true,
        name: 'managerId',
      },
      as: 'manager',
    });

    models.Site.belongsToMany(models.Technology, {
      constraints: false,
      foreignKey: {
        allowNull: false,
        name: 'siteId',
      },
      through: {
        model: models.SiteTechnology,
        unique: false,
      },
      as: 'technologies',
    });
  }
}

Site.init(
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
    address: {
      type: DataTypes.STRING,
      comment: '',
      allowNull: true,
    },
    locality: {
      type: DataTypes.STRING,
      comment: '',
      allowNull: true,
    },
    technicalLocation: {
      type: DataTypes.STRING,
      comment: '',
      allowNull: true,
    },
    latitude: {
      type: DataTypes.FLOAT,
      comment: '',
      allowNull: true,
    },
    longitude: {
      type: DataTypes.FLOAT,
      comment: '',
      allowNull: true,
    },
    serviceNumber: {
      type: DataTypes.STRING,
      comment: '',
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'site',
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
            regionId,
          },
        };
      },
    },
    /*indexes: [
				{
					fields: [ "organizationId"],
					name: 'site_organization_id_idx',
					using: 'BTREE',
				},
				{
					fields: [ "regionId"],
					name: 'site_region_id_idx',
					using: 'BTREE',
				},
				{
					fields: [ "zoneId"],
					name: 'site_zone_id_idx',
					using: 'BTREE',
				},
				{
					fields: [ "subzoneId"],
					name: 'site_subzone_id_idx',
					using: 'BTREE',
				},
				{
					fields: [ "areaId"],
					name: 'site_area_id_idx',
					using: 'BTREE',
				},
				{
					fields: [ "stateId"],
					name: 'site_state_id_idx',
					using: 'BTREE',
				},
		], */
  },
);

// Use this to add auth methods to the model
// addAuthMethodsToModel(Site, { field: 'password' });
// this add authenticate and changePassword methods to the model
// and a hook to hash the password before saving

export default Site;
