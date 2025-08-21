import DataLoader from 'dataloader';
import Server from '#models/server.model';

const serverLoader = new DataLoader(async (serverIds) => {
  const servers = await Server.findAll({
    where: {
      id: serverIds,
    },
  });

  const serverMap = {};
  servers.forEach((server) => {
    serverMap[server.id] = server;
  });

  return serverIds.map((id) => serverMap[id]);
});

export default serverLoader;
