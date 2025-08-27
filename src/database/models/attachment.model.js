import sequelize from '#config/database';
import BaseModel from '#shared/BaseModel';
import { DataTypes } from 'sequelize';
import { addAuditHooksToModel } from '#auth';

class Attachment extends BaseModel {
  static associate(models) {
    models.Attachment.belongsTo(models.Organization, {
      constraints: false,
      foreignKey: {
        allowNull: false,
      },
    });

    models.Attachment.belongsTo(models.Comment, {
      constraints: false,
      foreignKey: {
        allowNull: false,
        name: 'commentId',
      },
    });
  }

  static addAuditHooks(models) {
    addAuditHooksToModel(models.Attachment, [
      {
        model: models.Organization,
        field: 'organizationId',
        attributes: ['id', 'name'],
      },
      {
        model: models.Comment,
        field: 'commentId',
        attributes: ['id', 'content'],
      },
    ]);
  }
}

Attachment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      comment: 'File name',
      allowNull: false,
    },
    mimeType: {
      type: DataTypes.STRING,
      comment: 'File MIME type',
      allowNull: false,
    },
    size: {
      type: DataTypes.INTEGER,
      comment: 'File size in bytes',
      allowNull: false,
    },
    data: {
      type: DataTypes.BLOB('long'),
      comment: 'File binary data',
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'attachment',
    freezeTableName: true,
    paranoid: true,
    defaultScope: {
      attributes: {
        exclude: ['updatedAt', 'deletedAt', 'data'],
      },
    },
    scopes: {
      withData: {
        attributes: {
          exclude: ['updatedAt', 'deletedAt'],
        },
      },
    },
    /*indexes: [
      {
        fields: ['organizationId'],
        name: 'attachment_organization_id_idx',
        using: 'BTREE',
      },
      {
        fields: ['commentId'],
        name: 'attachment_comment_id_idx',
        using: 'BTREE',
      },
    ], */
  },
);

// Use this to add auth methods to the model
// addAuthMethodsToModel(Attachment, { field: 'password' });
// this add authenticate and changePassword methods to the model
// and a hook to hash the password before saving

export default Attachment;
