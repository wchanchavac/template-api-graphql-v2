import { merge } from 'es-toolkit';
import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';
import BaseModel from '../../shared/BaseModel.js';

class Subzone extends BaseModel {
  static associate(models) {
    models.Subzone.belongsTo(models.Organization, {
      constraints: false,
      foreignKey: {
        allowNull: false,
      },
    });
    models.Subzone.belongsTo(models.Zone, {
      constraints: false,
      foreignKey: {
        allowNull: false,
      },
    });
  }
}

Subzone.init(
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
  },
  {
    sequelize,
    modelName: 'subzone',
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
					name: 'subzone_organization_id_idx',
					using: 'BTREE',
				},
				{
					fields: [ "zoneId"],
					name: 'subzone_zone_id_idx',
					using: 'BTREE',
				},
		], */
  },
);

// Use this to add auth methods to the model
// addAuthMethodsToModel(Subzone, { field: 'password' });
// this add authenticate and changePassword methods to the model
// and a hook to hash the password before saving

export default Subzone;
