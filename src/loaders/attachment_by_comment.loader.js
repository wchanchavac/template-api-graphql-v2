import DataLoader from 'dataloader';
import Attachment from '#models/attachment.model';

const attachmentByCommentLoader = new DataLoader(async (commentIds) => {
  const attachments = await Attachment.findAll({
    where: {
      commentId: commentIds,
    },
    order: [['createdAt', 'ASC']],
  });

  const attachmentsByCommentMap = {};
  commentIds.forEach((commentId) => {
    attachmentsByCommentMap[commentId] = attachments.filter(
      (attachment) => attachment.commentId === commentId,
    );
  });

  return commentIds.map(
    (commentId) => attachmentsByCommentMap[commentId] || [],
  );
});

export default attachmentByCommentLoader;
