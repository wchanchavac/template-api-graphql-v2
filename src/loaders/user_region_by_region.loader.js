import DataLoader from 'dataloader';
import UserRegion from '#models/user_region.model';

const userRegionByRegionLoader = new DataLoader(
  async (regionIds) => {
    const userRegions = await UserRegion.findAll({
      where: {
        regionId: regionIds,
      },
      order: [['createdAt', 'DESC']],
    });

    const userRegionsByRegionMap = {};
    regionIds.forEach((regionId) => {
      userRegionsByRegionMap[regionId] = userRegions.filter(
        (userRegion) => userRegion.regionId === regionId,
      );
    });

    return regionIds.map((regionId) => userRegionsByRegionMap[regionId] || []);
  },
  {
    cache: false,
  },
);

export default userRegionByRegionLoader;
