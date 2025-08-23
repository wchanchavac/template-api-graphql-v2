import DataLoader from 'dataloader';
import Price from '#models/price.model';

const priceLoader = new DataLoader(async (priceIds) => {
  const prices = await Price.findAll({
    where: {
      id: priceIds,
    },
  });

  const priceMap = {};
  prices.forEach((price) => {
    priceMap[price.id] = price;
  });

  return priceIds.map((id) => priceMap[id]);
});

export default priceLoader;
