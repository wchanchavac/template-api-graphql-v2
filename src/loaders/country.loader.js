import DataLoader from 'dataloader';
import Country from '#models/country.model';

const countryLoader = new DataLoader(
  async (countryIds) => {
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
  },
  {
    cache: false,
  },
);

export default countryLoader;
