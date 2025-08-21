import DataLoader from 'dataloader';
import Technology from '#models/technology.model';

const technologyLoader = new DataLoader(async (technologyIds) => {
  const technologies = await Technology.findAll({
    where: {
      id: technologyIds,
    },
  });

  const technologyMap = {};
  technologies.forEach((technology) => {
    technologyMap[technology.id] = technology;
  });

  return technologyIds.map((id) => technologyMap[id]);
});

export default technologyLoader;
