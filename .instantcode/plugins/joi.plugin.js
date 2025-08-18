const { pluralize, singularize, camelize } = require('inflection');

module.exports = (config) => {
  let dataTypes = {
    hexadecimal: 'string',
    string: 'string',
    float: 'number',
    boolean: 'boolean',
    integer: 'number',
    uuid: 'string',
    email: 'string',
    json: 'string',
    url: 'string',
    enum: 'string',
    date: 'string',
    dateOnly: 'string',
  };

  let belongsToManyAssociations = [];
  for (let i = 0; i < config.data.data.length; i++) {
    let model = config.data.data[i];
    // config.data.data[i].enums = []
    const attributes = config.data.data[i].attributes || [];
    for (let ii = 0; ii < attributes.length; ii++) {
      config.data.data[i].attributes[ii].joiType =
        dataTypes[attributes[ii].type];
    }

    const associations = config.data.data[i].associations || [];
    for (let ii = 0; ii < associations.length; ii++) {
      config.data.data[i].associations[ii].joiType = 'string';
    }
  }

  return config;
};
