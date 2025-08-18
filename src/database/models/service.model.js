import { merge } from 'es-toolkit';
import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';
import BaseModel from '../../shared/BaseModel.js';

class Service extends BaseModel {
  static associate(models) {
    models.Service.belongsTo(models.Organization, {
      constraints: false,
      foreignKey: {
        allowNull: false,
      },
    });
    models.Service.belongsToMany(models.ServiceType, {
      constraints: false,
      foreignKey: {
        allowNull: true,
        name: 'serviceId',
      },
      through: 'service_serviceType',
    });
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
    createdBy: {
      type: DataTypes.UUID,
      allowNull: true,
    },
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
    scopes: {},
    /*indexes: [
				{
					fields: [ "organizationId"],
					name: 'service_organization_id_idx',
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
