import express from 'express';
const router = express.Router();

// Placeholder: Replace with real MongoDB logic
const companies = [
  { id: '1', name: 'Google', description: 'Search engine giant' },
  { id: '2', name: 'Microsoft', description: 'Software leader' },
];

router.get('/', (req, res) => {
  res.json(companies);
});

router.get('/:id', (req, res) => {
  const company = companies.find(c => c.id === req.params.id);
  if (!company) return res.status(404).json({ message: 'Not found' });
  res.json(company);
});

export default router;
