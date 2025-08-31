import express from 'express';
import DSAProblem from '../models/DSAProblem.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get all DSA problems
router.get('/', async (req, res) => {
  try {
    const { category, difficulty, search } = req.query;

    let query = {};

    if (category) {
      query.category = category;
    }

    if (difficulty) {
      query.difficulty = difficulty;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const problems = await DSAProblem.find(query).sort({ createdAt: -1 });
    res.json(problems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching DSA problems', error: error.message });
  }
});

// Get DSA problem by ID
router.get('/:id', async (req, res) => {
  try {
    const problem = await DSAProblem.findOne({ id: req.params.id });
    if (!problem) {
      return res.status(404).json({ message: 'DSA problem not found' });
    }
    res.json(problem);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching DSA problem', error: error.message });
  }
});

// Get problems by category
router.get('/category/:categoryId', async (req, res) => {
  try {
    const problems = await DSAProblem.find({ category: req.params.categoryId });
    res.json(problems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching problems by category', error: error.message });
  }
});

// Create a new DSA problem (admin only)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { id, title, description, difficulty, category, url, companies } = req.body;

    const existingProblem = await DSAProblem.findOne({ id });
    if (existingProblem) {
      return res.status(400).json({ message: 'Problem with this ID already exists' });
    }

    const problem = new DSAProblem({
      id,
      title,
      description,
      difficulty,
      category,
      url,
      companies: companies || []
    });

    await problem.save();
    res.status(201).json(problem);
  } catch (error) {
    res.status(500).json({ message: 'Error creating DSA problem', error: error.message });
  }
});

// Update a DSA problem (admin only)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { title, description, difficulty, category, url, companies } = req.body;

    const problem = await DSAProblem.findOneAndUpdate(
      { id: req.params.id },
      {
        title,
        description,
        difficulty,
        category,
        url,
        companies,
        updatedAt: Date.now()
      },
      { new: true }
    );

    if (!problem) {
      return res.status(404).json({ message: 'DSA problem not found' });
    }

    res.json(problem);
  } catch (error) {
    res.status(500).json({ message: 'Error updating DSA problem', error: error.message });
  }
});

// Delete a DSA problem (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const problem = await DSAProblem.findOneAndDelete({ id: req.params.id });
    if (!problem) {
      return res.status(404).json({ message: 'DSA problem not found' });
    }
    res.json({ message: 'DSA problem deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting DSA problem', error: error.message });
  }
});

// Get all unique categories
router.get('/meta/categories', async (req, res) => {
  try {
    const categories = await DSAProblem.distinct('category');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error: error.message });
  }
});

export default router;
