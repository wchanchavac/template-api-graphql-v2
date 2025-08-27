import DataLoader from 'dataloader';
import SiteVendor from '#models/site_vendor.model';

const siteVendorLoader = new DataLoader(async (siteVendorIds) => {
  const siteVendors = await SiteVendor.findAll({
    where: {
      id: siteVendorIds,
    },
  });

  const siteVendorMap = {};
  siteVendors.forEach((siteVendor) => {
    siteVendorMap[siteVendor.id] = siteVendor;
  });

  return siteVendorIds.map((id) => siteVendorMap[id]);
});

export default siteVendorLoader;
