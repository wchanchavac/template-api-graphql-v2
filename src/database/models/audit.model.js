import { DataTypes } from 'sequelize';
import sequelize from '#config/database';
import BaseModel from '#shared/BaseModel';

class AuditLog extends BaseModel {
  static associate(models) {}
}

AuditLog.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: {},
    },
    event: {
      type: DataTypes.ENUM,
      values: ['CREATE', 'UPDATE', 'DELETE'],
      allowNull: false,
    },
    previousData: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: {},
    },
    newData: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: {},
    },
    error: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: {},
    },
    entity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    entityId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'auditLog',
    freezeTableName: true,
    paranoid: true,
    defaultScope: {
      attributes: {
        exclude: ['updatedAt', 'deletedAt'],
      },
    },
    scopes: {},
  },
);

// Use this to add auth methods to the model
// addAuthMethodsToModel(AuditLog, { field: 'password' });
// this add authenticate and changePassword methods to the model
// and a hook to hash the password before saving

export default AuditLog;
