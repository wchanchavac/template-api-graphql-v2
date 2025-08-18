module.exports = (config) => {
  let { pluralize, singularize, camelize } = require('inflection');

  config.data.data = config.data.data || [];
  config.data.data = config.data.data.map((m) => {
    m.scope = !['user', 'organization'].includes(
      camelize(singularize(m.name), true),
    );
    m.PLURAL = camelize(pluralize(m.name)).toUpperCase();
    m.SINGULAR = camelize(singularize(m.name)).toUpperCase();
    m.Plural = camelize(pluralize(m.name));
    m.Singular = camelize(singularize(m.name));
    m.plural = camelize(pluralize(m.name), true);
    m.singular = camelize(singularize(m.name), true);
    m.file = camelize(singularize(m.name), true);
    m.singularlabel = `${m.singularLabel}`.toLowerCase();
    m.SINGULARLABEL = `${m.singularLabel}`.toUpperCase();
    m.plurallabel = `${m.pluralLabel}`.toLowerCase();
    m.PLURALLABEL = `${m.pluralLabel}`.toUpperCase();

    m.attributes.map((a) => {
      if (a.defaultValue !== 'undefined' && a.defaultValue !== '') {
        const type = typeof a.defaultValue;
        const isArray = Array.isArray(a.defaultValue);

        if (type === 'enum') {
          a.values = JSON.stringify(a.values || []);
        }

        if (type === 'object' || isArray) {
          a.defaultValue = JSON.stringify(a.defaultValue);
        }

        if (type === 'string') {
          a.defaultValue = `'${a.defaultValue}'`;
        }
      } else {
        delete a.defaultValue;
      }

      return a;
    });

    return m;
  });

  return config;
};
