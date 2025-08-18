import DataLoader from 'dataloader';
import Organization from '../database/models/organization.model.js';

const organizationLoader = new DataLoader(async (organizationIds) => {
  const organizations = await Organization.findAll({
    where: {
      id: organizationIds,
    },
  });

  const organizationMap = {};
  organizations.forEach((organization) => {
    organizationMap[organization.id] = organization;
  });

  return organizationIds.map((id) => organizationMap[id]);
});

export default organizationLoader;
