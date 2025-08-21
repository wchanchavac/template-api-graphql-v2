import DataLoader from 'dataloader';
import Status from '#models/status.model';

const statusLoader = new DataLoader(async (statusIds) => {
  const statuses = await Status.findAll({
    where: {
      id: statusIds,
    },
  });

  const statusMap = {};
  statuses.forEach((status) => {
    statusMap[status.id] = status;
  });

  return statusIds.map((id) => statusMap[id]);
});

export default statusLoader;
