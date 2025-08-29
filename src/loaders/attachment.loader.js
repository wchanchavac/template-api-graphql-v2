import DataLoader from 'dataloader';
import Attachment from '#models/attachment.model';

const attachmentLoader = new DataLoader(
  async (attachmentIds) => {
    const attachments = await Attachment.findAll({
      where: {
        id: attachmentIds,
      },
    });

    const attachmentMap = {};
    attachments.forEach((attachment) => {
      attachmentMap[attachment.id] = attachment;
    });

    return attachmentIds.map((id) => attachmentMap[id]);
  },
  {
    cache: false,
  },
);

export default attachmentLoader;
