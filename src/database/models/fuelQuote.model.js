import sequelize from '#config/database';
import BaseModel from '#shared/BaseModel';
import { DataTypes } from 'sequelize';
import { addAuditHooksToModel } from '#auth';

class FuelQuote extends BaseModel {
  static associate(models) {
    models.FuelQuote.belongsTo(models.Organization, {
      constraints: false,
      foreignKey: {
        allowNull: false,
      },
    });

    models.FuelQuote.belongsTo(models.SupportTicket, {
      constraints: false,
      foreignKey: {
        allowNull: false,
        name: 'supportTicketId',
      },
    });
  }

  static addAuditHooks(models) {
    addAuditHooksToModel(models.FuelQuote, [
      {
        model: models.Organization,
        field: 'organizationId',
        attributes: ['id', 'name'],
      },
      {
        model: models.SupportTicket,
        field: 'supportTicketId',
        attributes: ['id', 'origin', 'description'],
      },
    ]);
  }
}

FuelQuote.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    consumedQuantity: {
      type: DataTypes.INTEGER,
      comment: 'Quantity consumed',
      defaultValue: 0,
      allowNull: false,
    },
    authorizedQuantity: {
      type: DataTypes.INTEGER,
      comment: 'Quantity authorized',
      allowNull: false,
      defaultValue: 0,
    },
    authorizedUnitPrice: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      comment: 'Price per unit authorized',
      allowNull: false,
    },
    consumedUnitPrice: {
      type: DataTypes.FLOAT,
      comment: 'Price per unit consumed',
      allowNull: false,
      defaultValue: 0,
    },
    authorizedAmount: {
      type: DataTypes.FLOAT,
      comment: 'Total amount authorized',
      allowNull: false,
      defaultValue: 0,
      set(value) {
        this.setDataValue(
          'authorizedAmount',
          this.getDataValue('authorizedQuantity') *
            this.getDataValue('authorizedUnitPrice'),
        );
      },
    },
    consumedAmount: {
      type: DataTypes.FLOAT,
      comment: 'Total amount consumed',
      allowNull: false,
      defaultValue: 0,
      set(value) {
        this.setDataValue(
          'consumedAmount',
          this.getDataValue('consumedQuantity') *
            this.getDataValue('consumedUnitPrice'),
        );
      },
    },

    isComplete: {
      type: DataTypes.BOOLEAN,
      comment: 'Whether the quote is complete',
      allowNull: false,
      defaultValue: false,
    },
    isApproved: {
      type: DataTypes.BOOLEAN,
      comment: 'Whether the quote is approved',
      allowNull: false,
      defaultValue: false,
    },
    // siteId: {
    //   type: DataTypes.UUID,
    //   comment: 'Site ID reference',
    //   allowNull: false,
    // },
  },
  {
    sequelize,
    modelName: 'fuelQuote',
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
        fields: ['organizationId'],
        name: 'quote_organization_id_idx',
        using: 'BTREE',
      },
      {
        fields: ['supportTicketId'],
        name: 'quote_support_ticket_id_idx',
        using: 'BTREE',
      },
      {
        fields: ['serviceTypeId'],
        name: 'quote_service_type_id_idx',
        using: 'BTREE',
      },
      {
        fields: ['serviceId'],
        name: 'quote_service_id_idx',
        using: 'BTREE',
      },
      {
        fields: ['conceptId'],
        name: 'quote_concept_id_idx',
        using: 'BTREE',
      },
      {
        fields: ['measurementUnitId'],
        name: 'quote_measurement_unit_id_idx',
        using: 'BTREE',
      },
    ], */
  },
);

// Use this to add auth methods to the model
// addAuthMethodsToModel(FuelQuote, { field: 'password' });
// this add authenticate and changePassword methods to the model
// and a hook to hash the password before saving

export default FuelQuote;
