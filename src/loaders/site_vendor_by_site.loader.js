import DataLoader from 'dataloader';
import SiteVendor from '#models/site_vendor.model';

const siteVendorBySiteLoader = new DataLoader(
  async (siteIds) => {
    const siteVendors = await SiteVendor.findAll({
      where: {
        siteId: siteIds,
      },
      order: [
        ['isDefault', 'DESC'],
        ['createdAt', 'DESC'],
      ],
    });

    const siteVendorsBySiteMap = {};
    siteIds.forEach((siteId) => {
      siteVendorsBySiteMap[siteId] = siteVendors.filter(
        (siteVendor) => siteVendor.siteId === siteId,
      );
    });

    return siteIds.map((siteId) => siteVendorsBySiteMap[siteId] || []);
  },
  {
    cache: false,
  },
);

export default siteVendorBySiteLoader;
