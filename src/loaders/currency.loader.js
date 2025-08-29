import DataLoader from 'dataloader';
import Currency from '#models/currency.model';

const currencyLoader = new DataLoader(
  async (currencyIds) => {
    const currencies = await Currency.findAll({
      where: {
        id: currencyIds,
      },
    });

    const currencyMap = {};
    currencies.forEach((currency) => {
      currencyMap[currency.id] = currency;
    });

    return currencyIds.map((id) => currencyMap[id]);
  },
  {
    cache: false,
  },
);

export default currencyLoader;
