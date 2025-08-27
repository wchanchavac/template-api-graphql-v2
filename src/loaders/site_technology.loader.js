import DataLoader from 'dataloader';
import SiteTechnology from '#models/site_technology.model';

const siteTechnologyLoader = new DataLoader(async (siteTechnologyIds) => {
  const siteTechnologies = await SiteTechnology.findAll({
    where: {
      id: siteTechnologyIds,
    },
  });

  const siteTechnologyMap = {};
  siteTechnologies.forEach((siteTechnology) => {
    siteTechnologyMap[siteTechnology.id] = siteTechnology;
  });

  return siteTechnologyIds.map((id) => siteTechnologyMap[id]);
});

export default siteTechnologyLoader;
