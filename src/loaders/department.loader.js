import DataLoader from 'dataloader';
import Department from '#models/department.model';

const departmentLoader = new DataLoader(
  async (departmentIds) => {
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
  },
  {
    cache: false,
  },
);

export default departmentLoader;
