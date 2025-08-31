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

export default router;
