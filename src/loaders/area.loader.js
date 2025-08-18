import DataLoader from 'dataloader';
import Area from '../database/models/area.model.js';

const areaLoader = new DataLoader(async (areaIds) => {
  const areas = await Area.findAll({
    where: {
      id: areaIds,
    },
  });

  const areaMap = {};
  areas.forEach((area) => {
    areaMap[area.id] = area;
  });

  return areaIds.map((id) => areaMap[id]);
});

export default areaLoader;
