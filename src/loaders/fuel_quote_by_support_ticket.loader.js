import DataLoader from 'dataloader';
import FuelQuote from '#models/fuelQuote.model';

const fuelQuoteBySupportTicketLoader = new DataLoader(
  async (supportTicketIds) => {
    const fuelQuotes = await FuelQuote.findAll({
      where: {
        supportTicketId: supportTicketIds,
      },
      order: [['createdAt', 'DESC']],
    });

    const fuelQuotesBySupportTicketMap = {};
    supportTicketIds.forEach((supportTicketId) => {
      fuelQuotesBySupportTicketMap[supportTicketId] = fuelQuotes.filter(
        (fuelQuote) => fuelQuote.supportTicketId === supportTicketId,
      );
    });

    return supportTicketIds.map(
      (supportTicketId) => fuelQuotesBySupportTicketMap[supportTicketId] || [],
    );
  },
);

export default fuelQuoteBySupportTicketLoader;
