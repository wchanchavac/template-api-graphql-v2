import DataLoader from 'dataloader';
import SiteTechnology from '#models/site_technology.model';

const siteTechnologyLoader = new DataLoader(async (technologyIds) => {
  const siteTechnologies = await SiteTechnology.findAll({
    where: {
      technologyId: technologyIds,
    },
  });

  // console.log('siteTechnologies', siteTechnologies.length);
  // const siteTechnologyMap = {};
  // siteTechnologies.forEach((siteTechnology) => {
  //   siteTechnologyMap[siteTechnology.id] = siteTechnology
  // });

  return technologyIds.map((id) =>
    siteTechnologies.filter(
      (siteTechnology) => siteTechnology.technologyId === id,
    ),
  );
});

export default siteTechnologyLoader;
