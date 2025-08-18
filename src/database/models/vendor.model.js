import { merge } from 'es-toolkit';
import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';
import BaseModel from '../../shared/BaseModel.js';

class Vendor extends BaseModel {
  static associate(models) {
    models.Vendor.belongsTo(models.Organization, {
      constraints: false,
      foreignKey: {
        allowNull: false,
      },
    });
  }
}

Vendor.init(
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
    abbreviation: {
      type: DataTypes.STRING,
      comment: '',
      allowNull: true,
    },
    rfc: {
      type: DataTypes.STRING,
      comment: '',
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      comment: '',
      allowNull: true,
    },
    phones: {
      type: DataTypes.JSON,
      comment: '',
      allowNull: true,
      set(val) {
        let phones = this.getDataValue('phones');
        this.setDataValue('phones', merge({}, phones, val));
      },
    },
    image: {
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
    modelName: 'vendor',
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
					name: 'vendor_organization_id_idx',
					using: 'BTREE',
				},
		], */
  },
);

// Use this to add auth methods to the model
// addAuthMethodsToModel(Vendor, { field: 'password' });
// this add authenticate and changePassword methods to the model
// and a hook to hash the password before saving

export default Vendor;
