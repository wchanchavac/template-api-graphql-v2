import DataLoader from 'dataloader';
import Level from '../database/models/level.model.js';

const levelLoader = new DataLoader(async (levelIds) => {
  const levels = await Level.findAll({
    where: {
      id: levelIds,
    },
  });

  const levelMap = {};
  levels.forEach((level) => {
    levelMap[level.id] = level;
  });

  return levelIds.map((id) => levelMap[id]);
});

export default levelLoader;
