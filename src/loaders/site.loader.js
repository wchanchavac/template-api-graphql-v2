import DataLoader from 'dataloader';
import Site from '#models/site.model';

const siteLoader = new DataLoader(
  async (siteIds) => {
    const sites = await Site.findAll({
      where: {
        id: siteIds,
      },
    });

    const siteMap = {};
    sites.forEach((site) => {
      siteMap[site.id] = site;
    });

    return siteIds.map((id) => siteMap[id]);
  },
  {
    cache: false,
  },
);

export default siteLoader;
