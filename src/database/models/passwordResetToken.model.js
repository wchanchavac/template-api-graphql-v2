import { addAuthMethodsToModel } from '#auth';
import sequelize from '#config/database';
import BaseModel from '#shared/BaseModel';
import { DataTypes } from 'sequelize';

class PasswordResetToken extends BaseModel {
  static associate(models) {
    models.PasswordResetToken.belongsTo(models.User, {
      constraints: false,
      foreignKey: {
        allowNull: false,
      },
    });
  }
}

PasswordResetToken.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiratedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    usedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    requestIp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    requestAgent: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'passwordResetToken',
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

addAuthMethodsToModel(PasswordResetToken, { field: 'token' });

export default PasswordResetToken;
