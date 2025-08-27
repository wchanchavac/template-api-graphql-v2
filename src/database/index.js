import sequelize from '#config/database';
import Country from '#models/country.model';
import Currency from '#models/currency.model';
import State from '#models/state.model';
import Region from '#models/region.model';
import Department from '#models/department.model';
import Vendor from '#models/vendor.model';
import Level from '#models/level.model';
import Job from '#models/job.model';
import Server from '#models/server.model';
import Technology from '#models/technology.model';
import MeasurementUnit from '#models/measurementUnit.model';
import Zone from '#models/zone.model';
import Subzone from '#models/subzone.model';
import Area from '#models/area.model';
import Site from '#models/site.model';
import ServiceType from '#models/serviceType.model';
import Service from '#models/service.model';
import Status from '#models/status.model';
import Speciality from '#models/speciality.model';
import User from '#models/user.model';
import Organization from '#models/organization.model';
import Price from '#models/price.model';
import Concept from '#models/concept.model';
import Process from '#models/process.model';
import PasswordResetToken from '#models/passwordResetToken.model';
import SiteTechnology from '#models/site_technology.model';
import Stage from '#models/stage.model';

const db = {
  Country,
  Currency,
  Price,
  Concept,
  Process,
  State,
  Region,
  Department,
  Vendor,
  Level,
  Job,
  Server,
  Technology,
  MeasurementUnit,
  Zone,
  Subzone,
  Area,
  Site,
  ServiceType,
  Service,
  Status,
  Speciality,
  User,
  Organization,
  PasswordResetToken,
  SiteTechnology,
  Stage,
  sequelize,
};

for (const key in db) {
  if (Object.hasOwnProperty.call(db, key)) {
    const entity = db[key];
    if (entity.associate) {
      entity.associate(db);
    }

    if (entity.addAuditHooks) {
      entity.addAuditHooks(db);
    }
  }
}

await sequelize.sync();

// console.log(sequelize.models);

export default db;
