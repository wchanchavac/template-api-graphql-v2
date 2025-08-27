import DataLoader from 'dataloader';
import Quote from '#models/quote.model';

const quoteLoader = new DataLoader(async (quoteIds) => {
  const quotes = await Quote.findAll({
    where: {
      id: quoteIds,
    },
  });

  const quoteMap = {};
  quotes.forEach((quote) => {
    quoteMap[quote.id] = quote;
  });

  return quoteIds.map((id) => quoteMap[id]);
});

export default quoteLoader;
