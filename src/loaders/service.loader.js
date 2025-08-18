import DataLoader from 'dataloader';
import Service from '../database/models/service.model.js';

const serviceLoader = new DataLoader(async (serviceIds) => {
  const services = await Service.findAll({
    where: {
      id: serviceIds,
    },
  });

  const serviceMap = {};
  services.forEach((service) => {
    serviceMap[service.id] = service;
  });

  return serviceIds.map((id) => serviceMap[id]);
});

export default serviceLoader;
