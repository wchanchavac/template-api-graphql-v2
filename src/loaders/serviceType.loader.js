import DataLoader from 'dataloader';
import ServiceType from '#models/serviceType.model';

const serviceTypeLoader = new DataLoader(async (serviceTypeIds) => {
  const serviceTypes = await ServiceType.findAll({
    where: {
      id: serviceTypeIds,
    },
  });

  const serviceTypeMap = {};
  serviceTypes.forEach((serviceType) => {
    serviceTypeMap[serviceType.id] = serviceType;
  });

  return serviceTypeIds.map((id) => serviceTypeMap[id]);
});

export default serviceTypeLoader;
