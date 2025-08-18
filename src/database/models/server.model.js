import { merge } from 'es-toolkit';
import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';
import BaseModel from '../../shared/BaseModel.js';

class Server extends BaseModel {
  static associate(models) {
    models.Server.belongsTo(models.Organization, {
      constraints: false,
      foreignKey: {
        allowNull: false,
      },
    });
  }
}

Server.init(
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
    identifier: {
      type: DataTypes.STRING,
      comment: '',
      allowNull: false,
    },
    host: {
      type: DataTypes.STRING,
      comment: '',
      allowNull: false,
    },
    port: {
      type: DataTypes.INTEGER,
      comment: '',
      allowNull: false,
    },
    user: {
      type: DataTypes.STRING,
      comment: '',
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      comment: '',
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      comment: '',
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'server',
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
					name: 'server_organization_id_idx',
					using: 'BTREE',
				},
		], */
  },
);

// Use this to add auth methods to the model
// addAuthMethodsToModel(Server, { field: 'password' });
// this add authenticate and changePassword methods to the model
// and a hook to hash the password before saving

export default Server;
