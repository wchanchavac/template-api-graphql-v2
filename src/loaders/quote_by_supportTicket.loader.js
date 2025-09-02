import DataLoader from 'dataloader';
import Quote from '#models/quote.model';

const quoteBySiteLoader = new DataLoader(
  async (supportTicketIds) => {
    const quotes = await Quote.findAll({
      where: {
        supportTicketId: supportTicketIds,
      },
      order: [['createdAt', 'DESC']],
    });

    const quotesBySiteMap = {};
    supportTicketIds.forEach((supportTicketId) => {
      quotesBySiteMap[supportTicketId] = quotes.filter(
        (quote) => quote.supportTicketId === supportTicketId,
      );
    });

    return supportTicketIds.map(
      (supportTicketId) => quotesBySiteMap[supportTicketId] || [],
    );
  },
  {
    cache: false,
  },
);

export default quoteBySiteLoader;
