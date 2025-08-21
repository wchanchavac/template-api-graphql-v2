import DataLoader from 'dataloader';
import Subzone from '#models/subzone.model';

const subzoneLoader = new DataLoader(async (subzoneIds) => {
  const subzones = await Subzone.findAll({
    where: {
      id: subzoneIds,
    },
  });

  const subzoneMap = {};
  subzones.forEach((subzone) => {
    subzoneMap[subzone.id] = subzone;
  });

  return subzoneIds.map((id) => subzoneMap[id]);
});

export default subzoneLoader;
