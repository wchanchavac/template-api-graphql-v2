import DataLoader from 'dataloader';
import Comment from '#models/comment.model';

const commentByEntityLoader = new DataLoader(
  async (entityKeys) => {
    const comments = await Comment.findAll({
      where: {
        [Comment.Sequelize.Op.or]: entityKeys.map(
          ({ entityId, entityType }) => ({
            entityId,
            entityType,
          }),
        ),
      },
      order: [['createdAt', 'ASC']],
    });

    const commentsByEntityMap = {};
    entityKeys.forEach(({ entityId, entityType }) => {
      const key = `${entityType}:${entityId}`;
      commentsByEntityMap[key] = comments.filter(
        (comment) =>
          comment.entityId === entityId && comment.entityType === entityType,
      );
    });

    return entityKeys.map(({ entityId, entityType }) => {
      const key = `${entityType}:${entityId}`;
      return commentsByEntityMap[key] || [];
    });
  },
  {
    cache: false,
  },
);

export default commentByEntityLoader;
