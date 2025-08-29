import DataLoader from 'dataloader';
import SupportTicket from '#models/supportTicket.model';

const supportTicketLoader = new DataLoader(
  async (supportTicketIds) => {
    const supportTickets = await SupportTicket.findAll({
      where: {
        id: supportTicketIds,
      },
    });

    const supportTicketMap = {};
    supportTickets.forEach((supportTicket) => {
      supportTicketMap[supportTicket.id] = supportTicket;
    });

    return supportTicketIds.map((id) => supportTicketMap[id]);
  },
  {
    cache: false,
  },
);

export default supportTicketLoader;
