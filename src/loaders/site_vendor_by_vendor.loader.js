import DataLoader from 'dataloader';
import SiteVendor from '#models/site_vendor.model';

const siteVendorByVendorLoader = new DataLoader(async (vendorIds) => {
  const siteVendors = await SiteVendor.findAll({
    where: {
      vendorId: vendorIds,
    },
    order: [
      ['isDefault', 'DESC'],
      ['createdAt', 'DESC'],
    ],
  });

  const siteVendorsByVendorMap = {};
  vendorIds.forEach((vendorId) => {
    siteVendorsByVendorMap[vendorId] = siteVendors.filter(
      (siteVendor) => siteVendor.vendorId === vendorId,
    );
  });

  return vendorIds.map((vendorId) => siteVendorsByVendorMap[vendorId] || []);
});

export default siteVendorByVendorLoader;
