import DataLoader from 'dataloader';
import Attachment from '#models/attachment.model';

const attachmentByCommentLoader = new DataLoader(
  async (commentIds) => {
    const attachments = await Attachment.findAll({
      attributes: {
        exclude: ['updatedAt', 'deletedAt', 'data'],
      },
      where: {
        commentId: commentIds,
      },
      order: [['createdAt', 'ASC']],
    });

    return commentIds.map(
      (commentId) =>
        attachments.filter(
          (attachment) => attachment.commentId === commentId,
        ) || [],
    );
  },
  {
    cache: false,
  },
);

export default attachmentByCommentLoader;
