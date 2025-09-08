import sequelize from '#config/database';
import BaseModel from '#shared/BaseModel';
import { DataTypes } from 'sequelize';
import { addAuditHooksToModel } from '#auth';

class Quote extends BaseModel {
  static associate(models) {
    models.Quote.belongsTo(models.Organization, {
      constraints: false,
      foreignKey: {
        allowNull: false,
      },
    });

    models.Quote.belongsTo(models.SupportTicket, {
      constraints: false,
      foreignKey: {
        allowNull: false,
        name: 'supportTicketId',
      },
    });

    models.Quote.belongsTo(models.ServiceType, {
      constraints: false,
      foreignKey: {
        allowNull: false,
        name: 'serviceTypeId',
      },
    });

    models.Quote.belongsTo(models.Service, {
      constraints: false,
      foreignKey: {
        allowNull: false,
        name: 'serviceId',
      },
    });

    models.Quote.belongsTo(models.Concept, {
      constraints: false,
      foreignKey: {
        allowNull: false,
        name: 'conceptId',
      },
    });

    models.Quote.belongsTo(models.MeasurementUnit, {
      constraints: false,
      foreignKey: {
        allowNull: false,
        name: 'measurementUnitId',
      },
    });

    models.Quote.belongsTo(models.Price, {
      constraints: false,
      foreignKey: {
        allowNull: false,
        name: 'priceId',
      },
    });

    // models.Quote.belongsTo(models.Site, {
    //   constraints: false,
    //   foreignKey: {
    //     allowNull: false,
    //     name: 'siteId',
    //   },
    // });
  }

  static addAuditHooks(models) {
    addAuditHooksToModel(models.Quote, [
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
      {
        model: models.ServiceType,
        field: 'serviceTypeId',
        attributes: ['id', 'name'],
      },
      {
        model: models.Service,
        field: 'serviceId',
        attributes: ['id', 'name'],
      },
      {
        model: models.Concept,
        field: 'conceptId',
        attributes: ['id', 'code', 'description'],
      },
      {
        model: models.MeasurementUnit,
        field: 'measurementUnitId',
        attributes: ['id', 'name', 'abbreviation'],
      },
      {
        model: models.Site,
        field: 'siteId',
        attributes: ['id', 'name'],
      },
    ]);
  }
}

Quote.init(
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
    },
    unitPrice: {
      type: DataTypes.FLOAT,
      comment: 'Price per unit',
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      comment: 'Total amount',
      allowNull: false,
      defaultValue: 0,
      set(value) {
        this.setDataValue(
          'amount',
          this.getDataValue('authorizedQuantity') *
            this.getDataValue('unitPrice'),
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
    modelName: 'quote',
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

Quote.addHook('beforeCreate', async (quote, options) => {
  quote.amount = quote?.authorizedQuantity || 0 * quote?.unitPrice || 0;
});

Quote.addHook('beforeUpdate', async (quote, options) => {
  quote.amount = quote?.authorizedQuantity || 0 * quote?.unitPrice || 0;
});

// Use this to add auth methods to the model
// addAuthMethodsToModel(Quote, { field: 'password' });
// this add authenticate and changePassword methods to the model
// and a hook to hash the password before saving

export default Quote;
