import DataLoader from 'dataloader';
import Job from '../database/models/job.model.js';

const jobLoader = new DataLoader(async (jobIds) => {
  const jobs = await Job.findAll({
    where: {
      id: jobIds,
    },
  });

  const jobMap = {};
  jobs.forEach((job) => {
    jobMap[job.id] = job;
  });

  return jobIds.map((id) => jobMap[id]);
});

export default jobLoader;
