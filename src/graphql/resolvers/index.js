'use strict';

// import { loadFiles } from '@graphql-tools/load-files';
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
// import path from 'path';

import areaResolver from './area.resolver.js';
import countryResolver from './country.resolver.js';
import departmentResolver from './department.resolver.js';
import globalResolver from './global.resolver.js';
import jobResolver from './job.resolver.js';
import levelResolver from './level.resolver.js';
import measurementUnitResolver from './measurementUnit.resolver.js';
import organizationResolver from './organization.resolver.js';
import regionResolver from './region.resolver.js';
import serverResolver from './server.resolver.js';
import serviceResolver from './service.resolver.js';
import serviceTypeResolver from './serviceType.resolver.js';
import siteResolver from './site.resolver.js';
import specialityResolver from './speciality.resolver.js';
import stateResolver from './state.resolver.js';
import statusResolver from './status.resolver.js';
import subzoneResolver from './subzone.resolver.js';
import technologyResolver from './technology.resolver.js';
import userResolver from './user.resolver.js';
import vendorResolver from './vendor.resolver.js';
import zoneResolver from './zone.resolver.js';

const resolversArray = [
  areaResolver,
  countryResolver,
  departmentResolver,
  globalResolver,
  jobResolver,
  levelResolver,
  measurementUnitResolver,
  organizationResolver,
  regionResolver,
  serverResolver,
  serviceResolver,
  serviceTypeResolver,
  siteResolver,
  specialityResolver,
  stateResolver,
  statusResolver,
  subzoneResolver,
  technologyResolver,
  userResolver,
  vendorResolver,
  zoneResolver,
];

console.log('the amount of resolvers', resolversArray.length);
// console.log('the path', path.join(__dirname, './'));

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
