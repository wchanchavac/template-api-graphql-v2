import DataLoader from 'dataloader';
import UserType from '#models/userType.model';

const userTypeLoader = new DataLoader(
  async (userTypeIds) => {
    const userTypes = await UserType.findAll({
      where: {
        id: userTypeIds,
      },
    });

    const userTypeMap = {};
    userTypes.forEach((userType) => {
      userTypeMap[userType.id] = userType;
    });

    return userTypeIds.map((id) => userTypeMap[id]);
  },
  {
    cache: false,
  },
);

export default userTypeLoader;
