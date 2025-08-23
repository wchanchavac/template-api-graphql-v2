import DataLoader from 'dataloader';
import Concept from '#models/concept.model';

const conceptLoader = new DataLoader(async (conceptIds) => {
  const concepts = await Concept.findAll({
    where: {
      id: conceptIds,
    },
  });

  const conceptMap = {};
  concepts.forEach((concept) => {
    conceptMap[concept.id] = concept;
  });

  return conceptIds.map((id) => conceptMap[id]);
});

export default conceptLoader;
