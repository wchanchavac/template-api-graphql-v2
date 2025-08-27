import DataLoader from 'dataloader';
import Quote from '#models/quote.model';

const quoteBySiteLoader = new DataLoader(async (siteIds) => {
  const quotes = await Quote.findAll({
    where: {
      siteId: siteIds,
    },
    order: [['createdAt', 'DESC']],
  });

  const quotesBySiteMap = {};
  siteIds.forEach((siteId) => {
    quotesBySiteMap[siteId] = quotes.filter((quote) => quote.siteId === siteId);
  });

  return siteIds.map((siteId) => quotesBySiteMap[siteId] || []);
});

export default quoteBySiteLoader;
