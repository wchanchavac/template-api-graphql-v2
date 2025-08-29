import DataLoader from 'dataloader';
import Area from '#models/area.model';

const areaLoader = new DataLoader(
  async (areaIds) => {
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
  },
  {
    cache: false,
  },
);

export default areaLoader;
