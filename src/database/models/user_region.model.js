import { DataTypes } from 'sequelize';
import sequelize from '#config/database';
import BaseModel from '#shared/BaseModel';
import { addAuditHooksToModel } from '#auth';

class UserRegion extends BaseModel {
  static associate(models) {
    models.UserRegion.belongsTo(models.User, {
      constraints: false,
      foreignKey: {
        allowNull: false,
        name: 'userId',
      },
    });

    models.UserRegion.belongsTo(models.Region, {
      constraints: false,
      foreignKey: {
        allowNull: false,
        name: 'regionId',
      },
    });
  }

  static addAuditHooks(models) {
    addAuditHooksToModel(models.UserRegion, [
      {
        model: models.User,
        field: 'userId',
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

UserRegion.init(
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
  },
  {
    sequelize,
    modelName: 'user_region',
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
				name: 'user_region_organization_id_idx',
				using: 'BTREE',
			},
			{
				fields: [ "userId"],
				name: 'user_region_user_id_idx',
				using: 'BTREE',
			},
			{
				fields: [ "regionId"],
				name: 'user_region_region_id_idx',
				using: 'BTREE',
			},
	], */
  },
);

// Use this to add auth methods to the model
// addAuthMethodsToModel(UserRegion, { field: 'password' });
// this add authenticate and changePassword methods to the model
// and a hook to hash the password before saving

export default UserRegion;
