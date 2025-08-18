import DataLoader from 'dataloader';
import State from '../database/models/state.model.js';

const stateLoader = new DataLoader(async (stateIds) => {
  const states = await State.findAll({
    where: {
      id: stateIds,
    },
  });

  const stateMap = {};
  states.forEach((state) => {
    stateMap[state.id] = state;
  });

  return stateIds.map((id) => stateMap[id]);
});

export default stateLoader;
