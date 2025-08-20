'use strict';

import { loadFiles } from '@graphql-tools/load-files';
import { mergeResolvers } from '@graphql-tools/merge';
import {
  BigIntResolver,
  DateTimeResolver,
  EmailAddressResolver,
  HexadecimalResolver,
  JSONObjectResolver,
  JSONResolver,
  LocalDateResolver,
  URLResolver,
  UUIDResolver,
} from 'graphql-scalars';
import path from 'path';
import { getDirname } from '../utils/path.js';

const __dirname = getDirname(import.meta.url);

const resolversArray = await loadFiles(path.join(__dirname, './'), {
  extensions: ['.resolver.js'],
  ignoreIndex: true,
});

console.log('the amount of resolvers', resolversArray.length);

export default mergeResolvers([
  ...resolversArray,
  {
    BigInt: BigIntResolver,
    DateTime: DateTimeResolver,
    EmailAddress: EmailAddressResolver,
    Hexadecimal: HexadecimalResolver,
    JSONObject: JSONObjectResolver,
    JSON: JSONResolver,
    LocalDate: LocalDateResolver,
    URL: URLResolver,
    UUID: UUIDResolver,
  },
]);
