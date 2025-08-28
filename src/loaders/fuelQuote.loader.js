import DataLoader from 'dataloader';
import FuelQuote from '#models/fuelQuote.model';

const fuelQuoteLoader = new DataLoader(async (fuelQuoteIds) => {
  const fuelQuotes = await FuelQuote.findAll({
    where: {
      id: fuelQuoteIds,
    },
  });

  const fuelQuoteMap = {};
  fuelQuotes.forEach((fuelQuote) => {
    fuelQuoteMap[fuelQuote.id] = fuelQuote;
  });

  return fuelQuoteIds.map((id) => fuelQuoteMap[id]);
});

export default fuelQuoteLoader;
