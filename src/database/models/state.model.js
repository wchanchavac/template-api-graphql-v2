import { DataTypes } from 'sequelize';
import sequelize from '#config/database';
import BaseModel from '#shared/BaseModel';
import { addAuditHooksToModel } from '#auth';

class State extends BaseModel {
  static associate(models) {
    models.State.belongsTo(models.Organization, {
      constraints: false,
      foreignKey: {
        allowNull: false,
      },
    });
  }

  static addAuditHooks(models) {
    addAuditHooksToModel(models.State, [
      {
        model: models.Organization,
        field: 'organizationId',
        attributes: ['id', 'name'],
      },
    ]);
  }
}

State.init(
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
    abbreviation: {
      type: DataTypes.STRING,
      comment: '',
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'state',
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
					name: 'state_organization_id_idx',
					using: 'BTREE',
				},
		], */
  },
);

// Use this to add auth methods to the model
// addAuthMethodsToModel(State, { field: 'password' });
// this add authenticate and changePassword methods to the model
// and a hook to hash the password before saving

export default State;
