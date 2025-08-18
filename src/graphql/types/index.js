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
import path from 'path';
import { getDirname } from '../utils/path.js';

const __dirname = getDirname(import.meta.url);

const typesArray = loadFilesSync(path.join(__dirname, './'), {
  extensions: ['graphql'],
  ignoreIndex: true,
});

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
