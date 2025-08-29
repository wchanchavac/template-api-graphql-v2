import DataLoader from 'dataloader';
import Organization from '#models/organization.model';

const organizationLoader = new DataLoader(
  async (organizationIds) => {
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
  },
  {
    cache: false,
  },
);

export default organizationLoader;
