import DataLoader from 'dataloader';
import Region from '../database/models/region.model.js';

const regionLoader = new DataLoader(async (regionIds) => {
  const regions = await Region.findAll({
    where: {
      id: regionIds,
    },
  });

  const regionMap = {};
  regions.forEach((region) => {
    regionMap[region.id] = region;
  });

  return regionIds.map((id) => regionMap[id]);
});

export default regionLoader;
