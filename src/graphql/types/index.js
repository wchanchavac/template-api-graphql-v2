import { loadFiles } from '@graphql-tools/load-files';
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

async function createTypeDefs() {
  console.log('Loading GraphQL files from:', path.join(__dirname, './'));

  // Load global.graphql first, then other files
  const otherTypes = await loadFiles(path.join(__dirname, './'), {
    extensions: ['graphql'],
    ignoreIndex: true,
  });

  const typesArray = [...otherTypes];

  console.log(
    `Loaded ${typesArray.length} GraphQL files (global first, then others)`,
  );

  return mergeTypeDefs([
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
}

export default await createTypeDefs();
