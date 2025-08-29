import DataLoader from 'dataloader';
import Speciality from '#models/speciality.model';

const specialityLoader = new DataLoader(
  async (specialityIds) => {
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
  },
  {
    cache: false,
  },
);

export default specialityLoader;
