import DataLoader from 'dataloader';
import UserRegion from '#models/user_region.model';

const userRegionByUserLoader = new DataLoader(
  async (userIds) => {
    const userRegions = await UserRegion.findAll({
      where: {
        userId: userIds,
      },
      order: [['createdAt', 'DESC']],
    });

    const userRegionsByUserMap = {};
    userIds.forEach((userId) => {
      userRegionsByUserMap[userId] = userRegions.filter(
        (userRegion) => userRegion.userId === userId,
      );
    });

    return userIds.map((userId) => userRegionsByUserMap[userId] || []);
  },
  {
    cache: false,
  },
);

export default userRegionByUserLoader;
