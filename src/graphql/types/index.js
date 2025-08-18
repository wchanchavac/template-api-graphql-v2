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

const typesArray = loadFilesSync(join(process.cwd(), '/src/graphql/types'), {
  extensions: ['graphql'],
  ignoreIndex: true,
});

console.log('the path is', join(process.cwd(), '/src/graphql/types'));
console.log('the types array is', typesArray.length);

export default mergeTypeDefs([
  ...typesArray,
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
