import DataLoader from 'dataloader';
import Stage from '#models/stage.model';

const stageLoader = new DataLoader(
  async (stageIds) => {
    const stages = await Stage.findAll({
      where: {
        id: stageIds,
      },
    });

    const stageMap = {};
    stages.forEach((stage) => {
      stageMap[stage.id] = stage;
    });

    return stageIds.map((id) => stageMap[id]);
  },
  {
    cache: false,
  },
);

export default stageLoader;
