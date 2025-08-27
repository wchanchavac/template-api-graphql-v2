import sequelize from '#config/database';
import BaseModel from '#shared/BaseModel';
import { DataTypes } from 'sequelize';
import { addAuditHooksToModel } from '#auth';

class SupportTicket extends BaseModel {
  static associate(models) {
    models.SupportTicket.belongsTo(models.Organization, {
      constraints: false,
      foreignKey: {
        allowNull: false,
      },
    });

    models.SupportTicket.belongsTo(models.Process, {
      constraints: false,
      foreignKey: {
        allowNull: false,
        name: 'processId',
      },
    });

    models.SupportTicket.belongsTo(models.Stage, {
      constraints: false,
      foreignKey: {
        allowNull: true,
        name: 'stageId',
      },
    });

    models.SupportTicket.belongsTo(models.Site, {
      constraints: false,
      foreignKey: {
        allowNull: false,
        name: 'siteId',
      },
    });

    models.SupportTicket.belongsTo(models.Vendor, {
      constraints: false,
      foreignKey: {
        allowNull: false,
        name: 'vendorId',
      },
    });
  }

  static addAuditHooks(models) {
    addAuditHooksToModel(models.SupportTicket, [
      {
        model: models.Organization,
        field: 'organizationId',
        attributes: ['id', 'name'],
      },
      {
        model: models.Process,
        field: 'processId',
        attributes: ['id', 'name'],
      },
      {
        model: models.Stage,
        field: 'stageId',
        attributes: ['id', 'name'],
      },
      {
        model: models.Site,
        field: 'siteId',
        attributes: ['id', 'name'],
      },
      {
        model: models.Vendor,
        field: 'vendorId',
        attributes: ['id', 'name'],
      },
    ]);
  }
}

SupportTicket.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    origin: {
      type: DataTypes.STRING,
      comment: '',
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      comment: '',
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'supportTicket',
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
					name: 'support_ticket_organization_id_idx',
					using: 'BTREE',
				},
				{
					fields: [ "stageId"],
					name: 'support_ticket_stage_id_idx',
					using: 'BTREE',
				},
				{
					fields: [ "siteId"],
					name: 'support_ticket_site_id_idx',
					using: 'BTREE',
				},
				{
					fields: [ "vendorId"],
					name: 'support_ticket_vendor_id_idx',
					using: 'BTREE',
				},
		], */
  },
);

// Use this to add auth methods to the model
// addAuthMethodsToModel(SupportTicket, { field: 'password' });
// this add authenticate and changePassword methods to the model
// and a hook to hash the password before saving

export default SupportTicket;
