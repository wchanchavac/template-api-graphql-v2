import { DataTypes } from 'sequelize';
import sequelize from '#config/database';
import BaseModel from '#shared/BaseModel';

class UserType extends BaseModel {
  static associate(models) {}
}

UserType.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    level: {
      type: DataTypes.INTEGER,
      comment: '',
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      comment: '',
      allowNull: false,
    },
    permissions: {
      type: DataTypes.JSON,
      comment: '',
      allowNull: false,
      defaultValue: [],
    },
    stages: {
      type: DataTypes.JSON,
      comment: '',
      allowNull: false,
      defaultValue: [],
    },
  },
  {
    sequelize,
    modelName: 'userType',
    freezeTableName: true,
    paranoid: true,
    defaultScope: {
      attributes: {
        exclude: ['updatedAt', 'deletedAt'],
      },
    },
    scopes: {
      byUserType({ userType }) {
        return {
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'deletedAt'],
          },
          where: {
            level: {
              _lte: userType.level,
            },
          },
          order: [['level', 'DESC']],
        };
      },
    },
    /*indexes: [
			{
				fields: [ "organizationId"],
				name: 'userType_organization_id_idx',
				using: 'BTREE',
			},
	], */
  },
);

export default UserType;
