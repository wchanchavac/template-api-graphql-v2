import sequelize from '../config/database.js';
import Country from './models/country.model.js';
import State from './models/state.model.js';
import Region from './models/region.model.js';
import Department from './models/department.model.js';
import Vendor from './models/vendor.model.js';
import Level from './models/level.model.js';
import Job from './models/job.model.js';
import Server from './models/server.model.js';
import Technology from './models/technology.model.js';
import MeasurementUnit from './models/measurementUnit.model.js';
import Zone from './models/zone.model.js';
import Subzone from './models/subzone.model.js';
import Area from './models/area.model.js';
import Site from './models/site.model.js';
import ServiceType from './models/serviceType.model.js';
import Service from './models/service.model.js';
import Status from './models/status.model.js';
import Speciality from './models/speciality.model.js';
import User from './models/user.model.js';
import Organization from './models/organization.model.js';

const db = {
  Country,
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
  sequelize,
};

for (const key in db) {
  if (Object.hasOwnProperty.call(db, key)) {
    const entity = db[key];
    if (entity.associate) {
      entity.associate(db);
    }
  }
}

export default db;
