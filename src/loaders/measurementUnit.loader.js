import DataLoader from 'dataloader';
import MeasurementUnit from '#models/measurementUnit.model';

const measurementUnitLoader = new DataLoader(async (measurementUnitIds) => {
  const measurementUnits = await MeasurementUnit.findAll({
    where: {
      id: measurementUnitIds,
    },
  });

  const measurementUnitMap = {};
  measurementUnits.forEach((measurementUnit) => {
    measurementUnitMap[measurementUnit.id] = measurementUnit;
  });

  return measurementUnitIds.map((id) => measurementUnitMap[id]);
});

export default measurementUnitLoader;
