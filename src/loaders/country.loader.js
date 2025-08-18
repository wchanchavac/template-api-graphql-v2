import DataLoader from 'dataloader';
import Country from '../database/models/country.model.js';

const countryLoader = new DataLoader(async (countryIds) => {
  const countries = await Country.findAll({
    where: {
      id: countryIds,
    },
  });

  const countryMap = {};
  countries.forEach((country) => {
    countryMap[country.id] = country;
  });

  return countryIds.map((id) => countryMap[id]);
});

export default countryLoader;
