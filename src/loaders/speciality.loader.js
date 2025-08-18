import DataLoader from 'dataloader';
import Speciality from '../database/models/speciality.model.js';

const specialityLoader = new DataLoader(async (specialityIds) => {
  const specialities = await Speciality.findAll({
    where: {
      id: specialityIds,
    },
  });

  const specialityMap = {};
  specialities.forEach((speciality) => {
    specialityMap[speciality.id] = speciality;
  });

  return specialityIds.map((id) => specialityMap[id]);
});

export default specialityLoader;
