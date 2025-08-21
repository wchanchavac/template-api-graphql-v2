import DataLoader from 'dataloader';
import Vendor from '#models/vendor.model';

const vendorLoader = new DataLoader(async (vendorIds) => {
  const vendors = await Vendor.findAll({
    where: {
      id: vendorIds,
    },
  });

  const vendorMap = {};
  vendors.forEach((vendor) => {
    vendorMap[vendor.id] = vendor;
  });

  return vendorIds.map((id) => vendorMap[id]);
});

export default vendorLoader;
