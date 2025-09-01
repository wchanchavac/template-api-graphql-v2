import DataLoader from 'dataloader';
import UserRegion from '#models/user_region.model';
import Region from '#database/models/region.model';

const userRegionByUserLoader = new DataLoader(
  async (userIds) => {
    const userRegions = await UserRegion.findAll({
      where: {
        userId: userIds,
      },
      order: [['createdAt', 'DESC']],
    });

    // Extract unique regionIds to fetch regions in a single query
    const regionIds = [
      ...new Set(userRegions.map((ur) => ur.dataValues.regionId)),
    ];

    const regions =
      regionIds.length > 0
        ? await Region.findAll({
            where: {
              id: regionIds,
            },
          })
        : [];

    // Create a map for O(1) region lookup
    const regionMap = new Map(
      regions.map((region) => [region.dataValues.id, region]),
    );

    // Group userRegions by userId efficiently
    const userRegionsByUserMap = userRegions.reduce((acc, userRegion) => {
      const { userId, regionId } = userRegion.dataValues;
      const region = regionMap.get(regionId);

      if (region) {
        (acc[userId] ??= []).push(region);
      }
      return acc;
    }, {});

    // Ensure all userIds are represented, even if they have no regions
    return userIds.map((userId) => userRegionsByUserMap[userId] || []);
  },
  {
    cache: false,
  },
);

export default userRegionByUserLoader;
