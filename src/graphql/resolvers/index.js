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

import areaResolver from '#resolvers/area.resolver';
import authResolver from '#resolvers/auth.resolver';
import countryResolver from '#resolvers/country.resolver';
import currencyResolver from '#resolvers/currency.resolver';
import conceptResolver from '#resolvers/concept.resolver';
import priceResolver from '#resolvers/price.resolver';
import processResolver from '#resolvers/process.resolver';
import departmentResolver from '#resolvers/department.resolver';
import globalResolver from '#resolvers/global.resolver';
import jobResolver from '#resolvers/job.resolver';
import levelResolver from '#resolvers/level.resolver';
import measurementUnitResolver from '#resolvers/measurementUnit.resolver';
import organizationResolver from '#resolvers/organization.resolver';
import regionResolver from '#resolvers/region.resolver';
import serverResolver from '#resolvers/server.resolver';
import serviceResolver from '#resolvers/service.resolver';
import serviceTypeResolver from '#resolvers/serviceType.resolver';
import siteResolver from '#resolvers/site.resolver';
import specialityResolver from '#resolvers/speciality.resolver';
import stateResolver from '#resolvers/state.resolver';
import statusResolver from '#resolvers/status.resolver';
import subzoneResolver from '#resolvers/subzone.resolver';
import technologyResolver from '#resolvers/technology.resolver';
import userResolver from '#resolvers/user.resolver';
import vendorResolver from '#resolvers/vendor.resolver';
import zoneResolver from '#resolvers/zone.resolver';

const resolversArray = [
  areaResolver,
  authResolver,
  countryResolver,
  currencyResolver,
  conceptResolver,
  processResolver,
  priceResolver,
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
