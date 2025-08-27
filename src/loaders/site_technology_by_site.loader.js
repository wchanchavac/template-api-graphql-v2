import DataLoader from 'dataloader';
import SiteTechnology from '#models/site_technology.model';

const siteTechnologyLoader = new DataLoader(async (siteIds) => {
  const siteTechnologies = await SiteTechnology.findAll({
    where: {
      siteId: siteIds,
    },
  });

  // console.log('siteTechnologies', siteTechnologies.length);
  // const siteTechnologyMap = {};
  // siteTechnologies.forEach((siteTechnology) => {
  //   siteTechnologyMap[siteTechnology.id] = siteTechnology;
  // });

  return siteIds.map((id) =>
    siteTechnologies.filter((siteTechnology) => siteTechnology.siteId === id),
  );
});

export default siteTechnologyLoader;
