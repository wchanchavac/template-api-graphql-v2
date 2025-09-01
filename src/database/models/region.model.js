import { DataTypes } from 'sequelize';
import sequelize from '#config/database';
import BaseModel from '#shared/BaseModel';
import { addAuditHooksToModel } from '#auth';

class Region extends BaseModel {
  static associate(models) {
    models.Region.belongsTo(models.Organization, {
      constraints: false,
      foreignKey: {
        allowNull: false,
      },
    });

    models.Region.belongsToMany(models.User, {
      constraints: false,
      foreignKey: {
        allowNull: true,
        name: 'regionId',
      },
      through: {
        model: models.UserRegion,
        unique: false,
      },
    });
  }

  static addAuditHooks(models) {
    addAuditHooksToModel(models.Region, [
      {
        model: models.Organization,
        field: 'organizationId',
        attributes: ['id', 'name'],
      },
    ]);
  }
}

Region.init(
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
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'region',
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
					name: 'region_organization_id_idx',
					using: 'BTREE',
				},
		], */
  },
);

// Use this to add auth methods to the model
// addAuthMethodsToModel(Region, { field: 'password' });
// this add authenticate and changePassword methods to the model
// and a hook to hash the password before saving

export default Region;
