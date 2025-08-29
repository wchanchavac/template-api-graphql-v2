import DataLoader from 'dataloader';
import Process from '#models/process.model';

const processLoader = new DataLoader(
  async (processIds) => {
    const processes = await Process.findAll({
      where: {
        id: processIds,
      },
    });

    const processMap = {};
    processes.forEach((process) => {
      processMap[process.id] = process;
    });

    return processIds.map((id) => processMap[id]);
  },
  {
    cache: false,
  },
);

export default processLoader;
