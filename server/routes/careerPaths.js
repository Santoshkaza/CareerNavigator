import express from 'express';
const router = express.Router();

// Placeholder: Replace with real MongoDB logic
const careerPaths = [
  { id: '1', name: 'Software Engineer', roadmapId: '1' },
  { id: '2', name: 'Data Scientist', roadmapId: '2' },
];

router.get('/', (req, res) => {
  res.json(careerPaths);
});

router.get('/:id', (req, res) => {
  const path = careerPaths.find(c => c.id === req.params.id);
  if (!path) return res.status(404).json({ message: 'Not found' });
  res.json(path);
});

router.post('/', (req, res) => {
  const { name, roadmapId, skills, education, jobOutlook, relatedJobs } = req.body;

  if (!name || !roadmapId) {
    return res.status(400).json({ message: 'Name and roadmapId are required' });
  }

  const newCareerPath = {
    id: (careerPaths.length + 1).toString(),
    name,
    roadmapId,
    skills,
    education,
    jobOutlook,
    relatedJobs
  };

  careerPaths.push(newCareerPath);
  res.status(201).json(newCareerPath);
});

export default router;
