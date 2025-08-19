const modelPlugin = require('./.instantcode/plugins/model.plugin');
const graphqlPlugin = require('./.instantcode/plugins/graphql.plugin');
const joiPlugin = require('./.instantcode/plugins/joi.plugin');

module.exports = () => {
  let config = {
    data: require('./.instantcode/data.json'),
    templates: [
      {
        src: './.instantcode/files/model.js',
        dest: './src/database/models/[file].model.js',
        key: 'data',
      },
      {
        src: './.instantcode/files/instance.js',
        dest: './src/database/index.js',
      },
      {
        src: './.instantcode/files/resolver.js',
        dest: './src/graphql/resolvers/[file].resolver.js',
        key: 'data',
      },
      {
        src: './.instantcode/files/dataloader.js',
        dest: './src/loaders/[file].loader.js',
        key: 'data',
      },
      {
        src: './.instantcode/files/index.dataloader.js',
        dest: './src/loaders/index.js',
      },

      {
        src: './.instantcode/files/type.js',
        dest: './src/graphql/types/[file].graphql',
        key: 'data',
      },
      {
        src: './.instantcode/files/global.type.js',
        dest: './src/graphql/types/global.graphql',
        key: 'data',
        if: (model) => {
          return model.singular === 'user';
        },
      },
      {
        src: './.instantcode/files/global.resolver.js',
        dest: './src/graphql/resolvers/global.resolver.js',
        key: 'data',
        if: (model) => {
          return model.singular === 'user';
        },
      },
    ],
  };

  config = modelPlugin(config);
  config = graphqlPlugin(config);
  config = joiPlugin(config);
  return config;
};
