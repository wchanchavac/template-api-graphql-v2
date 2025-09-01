import sequelize from '#config/database';
import BaseModel from '#shared/BaseModel';
import { DataTypes } from 'sequelize';
import { addAuditHooksToModel } from '#auth';

class Comment extends BaseModel {
  static associate(models) {
    models.Comment.belongsTo(models.Organization, {
      constraints: false,
      foreignKey: {
        allowNull: false,
      },
    });

    models.Comment.belongsTo(models.User, {
      constraints: false,
      foreignKey: {
        allowNull: false,
        name: 'userId',
      },
    });

    models.Comment.hasMany(models.Attachment, {
      constraints: false,
      foreignKey: {
        allowNull: false,
        name: 'commentId',
      },
    });
  }

  static addAuditHooks(models) {
    addAuditHooksToModel(models.Comment, [
      {
        model: models.Organization,
        field: 'organizationId',
        attributes: ['id', 'name'],
      },
      {
        model: models.User,
        field: 'userId',
        attributes: ['id', 'name', 'email'],
      },
    ]);
  }
}

Comment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      comment: 'Comment content',
      allowNull: false,
    },
    // hasAttachment: {
    //   type: DataTypes.BOOLEAN,
    //   comment: 'Whether the comment has attachments',
    //   allowNull: false,
    //   defaultValue: false,
    // },
    entityId: {
      type: DataTypes.UUID,
      comment: 'ID of the entity this comment belongs to',
      allowNull: false,
    },
    entityType: {
      type: DataTypes.STRING,
      comment:
        'Type of entity this comment belongs to (e.g., "quote", "supportTicket")',
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'comment',
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
        name: 'comment_organization_id_idx',
        using: 'BTREE',
      },
      {
        fields: ['userId'],
        name: 'comment_user_id_idx',
        using: 'BTREE',
      },
      {
        fields: ['entityId', 'entityType'],
        name: 'comment_entity_idx',
        using: 'BTREE',
      },
    ], */
  },
);

// Use this to add auth methods to the model
// addAuthMethodsToModel(Comment, { field: 'password' });
// this add authenticate and changePassword methods to the model
// and a hook to hash the password before saving

export default Comment;
