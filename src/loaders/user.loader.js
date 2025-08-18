import DataLoader from 'dataloader';
import User from '../database/models/user.model.js';

const userLoader = new DataLoader(async (userIds) => {
  const users = await User.findAll({
    where: {
      id: userIds,
    },
  });

  const userMap = {};
  users.forEach((user) => {
    userMap[user.id] = user;
  });

  return userIds.map((id) => userMap[id]);
});

export default userLoader;
