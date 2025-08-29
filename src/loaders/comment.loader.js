import DataLoader from 'dataloader';
import Comment from '#models/comment.model';

const commentLoader = new DataLoader(
  async (commentIds) => {
    const comments = await Comment.findAll({
      where: {
        id: commentIds,
      },
    });

    const commentMap = {};
    comments.forEach((comment) => {
      commentMap[comment.id] = comment;
    });

    return commentIds.map((id) => commentMap[id]);
  },
  {
    cache: false,
  },
);

export default commentLoader;
