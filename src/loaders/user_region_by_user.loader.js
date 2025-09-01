import DataLoader from 'dataloader';
import UserRegion from '#models/user_region.model';
import Region from '#database/models/region.model';

const userRegionByUserLoader = new DataLoader(
  async (userIds) => {
    const userRegions = await UserRegion.findAll({
      attributes: ['userId', 'regionId'],
      where: {
        userId: userIds,
      },
      order: [['createdAt', 'DESC']],
    });

    const userRegionsByUserMap = {};
    const regionIds = userRegions.map((userRegion) => userRegion.regionId);

    userIds.forEach((userId) => {
      userRegionsByUserMap[userId] = userRegions.filter(
        (userRegion) => userRegion.userId === userId,
      );
    });

    const regions = await Region.findAll({
      where: {
        id: regionIds,
      },
    });

    const regionMap = {};
    regions.forEach((region) => {
      regionMap[region.id] = region;
    });

    return userIds.map((userId) =>
      userRegionsByUserMap[userId].map(
        (userRegion) => regionMap[userRegion.regionId],
      ),
    );
  },
  {
    cache: false,
  },
);

export default userRegionByUserLoader;
