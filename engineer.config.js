const modelPlugin = require('./.instantcode/plugins/model.plugin');
const graphqlPlugin = require('./.instantcode/plugins/graphql.plugin');
const joiPlugin = require('./.instantcode/plugins/joi.plugin');

module.exports = () => {
  let config = {
    data: require('./.instantcode/data.json'),
    templates: [
      // {
      // 	src: './.instantcode/files/index.resolver.js',
      // 	dest: './src/graphql/resolvers/index.resolver.js',
      // },
      //   {
      //     src: './.instantcode/files/index.type.js',
      //     dest: './src/graphql/types/index.type.js',
      //   },
      //   {
      //     src: './.instantcode/files/global.resolver.js',
      //     dest: './src/graphql/resolvers/global.resolver.js',
      //   },
      {
        src: './.instantcode/files/model.js',
        dest: './src/database/models/[file].model.js',
        key: 'data',
        // "if" : (model)=>{
        //   console.log(model)
        //   return true
        // }
      },
      {
        src: './.instantcode/files/instance.js',
        dest: './src/database/index.js',
        // key: 'data',
        // "if" : (model)=>{
        //   console.log(model)
        //   return true
        // }
      },
      {
        src: './.instantcode/files/resolver.js',
        dest: './src/graphql/resolvers/[file].resolver.js',
        key: 'data',
        // "if" : (model)=>{
        //   console.log(model)
        //   return true
        // }
      },
      {
        src: './.instantcode/files/dataloader.js',
        dest: './src/loaders/[file].loader.js',
        key: 'data',
      },
      {
        src: './.instantcode/files/index.dataloader.js',
        dest: './src/loaders/index.js',
        // key: 'data',
      },
      //   {
      //     src: './.instantcode/files/api.client.ts',
      //     dest: './web/api/ts/[file].ts',
      //     key: 'data',
      //     // "if" : (model)=>{
      //     //   console.log(model)
      //     //   return true
      //     // }
      //   },
      //   {
      //     src: './.instantcode/files/api.client.ts',
      //     dest: './web/api/js/[file].js',
      //     key: 'data',
      //     // "if" : (model)=>{
      //     //   console.log(model)
      //     //   return true
      //     // }
      //   },
      //   {
      //     src: './.instantcode/files/form.client.ts',
      //     dest: './web/settings/[file].ts',
      //     key: 'data',
      //     // "if" : (model)=>{
      //     //   console.log(model)
      //     //   return true
      //     // }
      //   },
      //   {
      //     src: './.instantcode/files/module.jsx',
      //     dest: './web/react/[plural]/[Plural]Table.jsx',
      //     key: 'data',
      //     // "if" : (model)=>{
      //     //   console.log(model)
      //     //   return true
      //     // }
      //   },
      //   {
      //     src: './.instantcode/files/index.js',
      //     dest: './web/react/[plural]/index.js',
      //     key: 'data',
      //     // "if" : (model)=>{
      //     //   console.log(model)
      //     //   return true
      //     // }
      //   },
      //   {
      //     src: './.instantcode/files/+page.svelte',
      //     dest: './web/modules/[plural]/+page.svelte',
      //     key: 'data',
      //     // "if" : (model)=>{
      //     //   console.log(model)
      //     //   return true
      //     // }
      //   },
      {
        src: './.instantcode/files/type.js',
        dest: './src/graphql/types/[file].graphql',
        key: 'data',
        // "if" : (model)=>{
        //   console.log(model)
        //   return true
        // }
      },
      //   {
      //     src: './.instantcode/files/README.md',
      //     dest: './README.md',
      //     key: 'project',
      //     // "if" : (model)=>{
      //     //   console.log(model)
      //     //   return true
      //     // }
      //   },

      {
        src: './.instantcode/files/global.type.js',
        dest: './src/graphql/types/global.graphql',
        key: 'data',
        if: (model) => {
          return model.singular === 'user';
        },
      },

      // You can use an additional "if" key and provide a function that will return either true or false.
      // Returning false will prevent a file for being generated. Your function will receive the data input for the template.
      // {
      //   "src" : "./.instantcode/files/module.js",
      //   "dest" : "./src/[id]/[id].module.js",
      //   "key" : "data",
      //   "if" : (model)=>{
      //     return model.code
      //   }
      // }
    ],
  };

  config = modelPlugin(config);
  config = graphqlPlugin(config);
  config = joiPlugin(config);
  return config;
};
