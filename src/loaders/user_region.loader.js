import DataLoader from 'dataloader';
import UserRegion from '#models/user_region.model';

const userRegionLoader = new DataLoader(
  async (userRegionIds) => {
    const userRegions = await UserRegion.findAll({
      where: {
        id: userRegionIds,
      },
    });

    const userRegionMap = {};
    userRegions.forEach((userRegion) => {
      userRegionMap[userRegion.id] = userRegion;
    });

    return userRegionIds.map((id) => userRegionMap[id]);
  },
  {
    cache: false,
  },
);

export default userRegionLoader;
