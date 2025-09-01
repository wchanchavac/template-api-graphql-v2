import { DataTypes } from 'sequelize';
import sequelize from '#config/database';
import BaseModel from '#shared/BaseModel';
import { addAuditHooksToModel, addAuthMethodsToModel } from '#auth';

class User extends BaseModel {
  static associate(models) {
    models.User.belongsTo(models.Organization, {
      constraints: false,
      foreignKey: {
        allowNull: false,
      },
    });

    models.User.belongsTo(models.UserType, {
      constraints: false,
      foreignKey: {
        allowNull: false,
      },
    });

    models.User.belongsTo(models.Vendor, {
      constraints: false,
      foreignKey: {
        allowNull: true,
      },
    });

    models.User.belongsToMany(models.Region, {
      constraints: false,
      foreignKey: {
        allowNull: true,
        name: 'userId',
      },
      through: {
        model: models.UserRegion,
        unique: false,
      },
    });
  }

  static addAuditHooks(models) {
    addAuditHooksToModel(models.User, [
      {
        model: models.Organization,
        field: 'organizationId',
        attributes: ['id', 'name'],
      },
      {
        model: models.UserType,
        field: 'userTypeId',
        attributes: ['id', 'name'],
      },
      {
        model: models.Vendor,
        field: 'vendorId',
        attributes: ['id', 'name'],
      },
    ]);
  }
}

User.init(
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
    email: {
      type: DataTypes.STRING,
      comment: '',
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      comment: '',
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'user',
    freezeTableName: true,
    paranoid: true,
    defaultScope: {
      attributes: {
        exclude: ['updatedAt', 'deletedAt', 'password'],
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
    },
    /*indexes: [
				{
					fields: [ "organizationId"],
					name: 'user_organization_id_idx',
					using: 'BTREE',
				},
		], */
  },
);

// Use this to add auth methods to the model
addAuthMethodsToModel(User, { field: 'password' });
// this add authenticate and changePassword methods to the model
// and a hook to hash the password before saving

export default User;
