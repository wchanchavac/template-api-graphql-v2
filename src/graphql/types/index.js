import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadTypedefsSync } from '@graphql-tools/load';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import {
  BigIntTypeDefinition,
  DateTimeTypeDefinition,
  EmailAddressTypeDefinition,
  HexadecimalTypeDefinition,
  JSONDefinition,
  JSONObjectDefinition,
  LocalDateTypeDefinition,
  URLTypeDefinition,
  UUIDDefinition,
} from 'graphql-scalars';
import { join } from 'path';

const pattern = join(process.cwd(), 'src/graphql/types/*.graphql');

const sources = loadTypedefsSync(pattern, {
  loaders: [new GraphQLFileLoader()],
});

console.log('the path is', join(process.cwd(), '/src/graphql/types'));
console.log('the sources are', sources.length);

export default mergeTypeDefs([
  ...sources.map((source) => source.document),
  BigIntTypeDefinition,
  DateTimeTypeDefinition,
  EmailAddressTypeDefinition,
  HexadecimalTypeDefinition,
  JSONDefinition,
  JSONObjectDefinition,
  LocalDateTypeDefinition,
  URLTypeDefinition,
  UUIDDefinition,
]);
