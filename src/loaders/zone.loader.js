import DataLoader from 'dataloader';
import Zone from '#models/zone.model';

const zoneLoader = new DataLoader(
  async (zoneIds) => {
    const zones = await Zone.findAll({
      where: {
        id: zoneIds,
      },
    });

    const zoneMap = {};
    zones.forEach((zone) => {
      zoneMap[zone.id] = zone;
    });

    return zoneIds.map((id) => zoneMap[id]);
  },
  {
    cache: false,
  },
);

export default zoneLoader;
