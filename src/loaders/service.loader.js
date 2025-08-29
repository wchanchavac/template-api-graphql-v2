import DataLoader from 'dataloader';
import Service from '#models/service.model';

const serviceLoader = new DataLoader(
  async (serviceIds) => {
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
  },
  {
    cache: false,
  },
);

export default serviceLoader;
