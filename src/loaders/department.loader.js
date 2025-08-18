import DataLoader from 'dataloader';
import Department from '../database/models/department.model.js';

const departmentLoader = new DataLoader(async (departmentIds) => {
  const departments = await Department.findAll({
    where: {
      id: departmentIds,
    },
  });

  const departmentMap = {};
  departments.forEach((department) => {
    departmentMap[department.id] = department;
  });

  return departmentIds.map((id) => departmentMap[id]);
});

export default departmentLoader;
