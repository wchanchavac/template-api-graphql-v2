import DataLoader from 'dataloader';
import {{Singular}} from '../database/models/{{singular}}.model.js';

const {{singular}}Loader = new DataLoader(async ({{singular}}Ids) => {
  const {{plural}} = await {{Singular}}.findAll({
    where: {
      id: {{singular}}Ids,
    },
  });

  const {{singular}}Map = {};
  {{plural}}.forEach(({{singular}}) => {
    {{singular}}Map[{{singular}}.id] = {{singular}};
  });

  return {{singular}}Ids.map((id) => {{singular}}Map[id]);
});

export default {{singular}}Loader;
