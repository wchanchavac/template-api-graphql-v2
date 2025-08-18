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

const otherTypes = loadFilesSync(join(process.cwd(), '/src/graphql/types'), {
  extensions: ['graphql'],
  ignoreIndex: true,
});

const typesArray = [...otherTypes];

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
