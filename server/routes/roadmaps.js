import express from 'express';
const router = express.Router();

// Placeholder: Replace with real MongoDB logic
const roadmaps = [
  { id: '1', title: 'Frontend Developer', description: 'Learn React, CSS, JS' },
  { id: '2', title: 'Backend Developer', description: 'Learn Node, Express, MongoDB' },
];

router.get('/', (req, res) => {
  res.json(roadmaps);
});

router.get('/:id', (req, res) => {
  const roadmap = roadmaps.find(r => r.id === req.params.id);
  if (!roadmap) return res.status(404).json({ message: 'Not found' });
  res.json(roadmap);
});

export default router;
