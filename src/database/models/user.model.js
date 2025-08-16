import BaseModel from '../../shared/BaseModel.js';
import { DataTypes } from 'sequelize';

/**
 *
 * @param {import('sequelize').Sequelize} sequelize
 * @returns {import('sequelize').ModelStatic<import('sequelize').Model> & typeof BaseModel}
 */
const initUserModel = (sequelize) => {
  class User extends BaseModel {
    static associate() {}
  }

  User.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      tableName: 'users',
      timestamps: false,
    },
  );

  return User;
};

export default initUserModel;
