import DataLoader from 'dataloader';
import Zone from '../database/models/zone.model.js';

const zoneLoader = new DataLoader(async (zoneIds) => {
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
});

export default zoneLoader;
