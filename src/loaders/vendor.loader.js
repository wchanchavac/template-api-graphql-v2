import DataLoader from 'dataloader';
import Vendor from '../database/models/vendor.model.js';

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
