import { DataTypes } from 'sequelize';
import sequelize from '#config/database';
import BaseModel from '#shared/BaseModel';
import { addAuditHooksToModel } from '#auth';

class Service extends BaseModel {
  static associate(models) {
    models.Service.belongsTo(models.Organization, {
      constraints: false,
      foreignKey: {
        allowNull: false,
      },
    });
    models.Service.belongsTo(models.ServiceType, {
      constraints: false,
      foreignKey: {
        allowNull: true,
      },
    });
  }

  static addAuditHooks(models) {
    addAuditHooksToModel(models.Service, [
      {
        model: models.Organization,
        field: 'organizationId',
        attributes: ['id', 'name'],
      },
    ]);
  }
}

Service.init(
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
    description: {
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
    modelName: 'service',
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
    },
    /*indexes: [
				{
					fields: [ "organizationId"],
					name: 'service_organization_id_idx',
					using: 'BTREE',
				},
				{
					fields: [ "serviceTypeId"],
					name: 'service_serviceType_id_idx',
					using: 'BTREE',
				},
		], */
  },
);

// Use this to add auth methods to the model
// addAuthMethodsToModel(Service, { field: 'password' });
// this add authenticate and changePassword methods to the model
// and a hook to hash the password before saving

export default Service;
