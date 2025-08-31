import express from 'express';
import Progress from '../models/Progress.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get user's complete progress dashboard
router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    let progress = await Progress.findOne({ userId: req.user.id });
    
    if (!progress) {
      // Create initial progress record
      progress = new Progress({
        userId: req.user.id,
        dsaProgress: {
          completedProblems: [],
          totalSolved: 0,
          easyCount: 0,
          mediumCount: 0,
          hardCount: 0,
          currentStreak: 0,
          maxStreak: 0
        },
        roadmapProgress: [],
        goals: [],
        careerPathProgress: [],
        studyStats: {
          totalStudyTime: 0,
          weeklyStudyTime: 0,
          dailyAverage: 0,
          studySessions: []
        },
        achievements: []
      });
      await progress.save();
    }

    // Calculate weekly study time (last 7 days)
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    const weeklyTime = progress.studyStats.studySessions
      .filter(session => session.date >= weekAgo)
      .reduce((total, session) => total + session.duration, 0);
    
    progress.studyStats.weeklyStudyTime = weeklyTime;
    await progress.save();

    res.json({
      overallProgress: progress.overallProgress,
      dsaProgress: progress.dsaProgress,
      roadmapProgress: progress.roadmapProgress,
      goals: progress.goals,
      careerPathProgress: progress.careerPathProgress,
      studyStats: progress.studyStats,
      achievements: progress.achievements,
      weeklyReport: progress.weeklyReport
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching progress', error: error.message });
  }
});

// Mark DSA problem as completed
router.post('/dsa/complete', authMiddleware, async (req, res) => {
  try {
    const { problemId, difficulty, timeSpent, attempts = 1 } = req.body;
    
    let progress = await Progress.findOne({ userId: req.user.id });
    if (!progress) {
      progress = new Progress({ userId: req.user.id });
    }

    // Check if problem already completed
    const alreadyCompleted = progress.dsaProgress.completedProblems.some(
      p => p.problemId === problemId
    );

    if (!alreadyCompleted) {
      progress.dsaProgress.completedProblems.push({
        problemId,
        difficulty,
        timeSpent,
        attempts,
        completedAt: new Date()
      });

      progress.dsaProgress.totalSolved += 1;
      
      // Update difficulty counters
      if (difficulty === 'EASY') progress.dsaProgress.easyCount += 1;
      else if (difficulty === 'MEDIUM') progress.dsaProgress.mediumCount += 1;
      else if (difficulty === 'HARD') progress.dsaProgress.hardCount += 1;

      // Update streak
      const today = new Date().toDateString();
      const lastSolved = progress.dsaProgress.lastSolvedDate?.toDateString();
      
      if (lastSolved === today) {
        // Already solved today, don't update streak
      } else if (lastSolved === new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString()) {
        // Solved yesterday, continue streak
        progress.dsaProgress.currentStreak += 1;
      } else {
        // Streak broken or new streak
        progress.dsaProgress.currentStreak = 1;
      }

      progress.dsaProgress.maxStreak = Math.max(
        progress.dsaProgress.maxStreak, 
        progress.dsaProgress.currentStreak
      );
      progress.dsaProgress.lastSolvedDate = new Date();

      // Add study session
      progress.studyStats.studySessions.push({
        date: new Date(),
        duration: timeSpent || 30,
        activity: 'DSA',
        focus: problemId
      });

      progress.studyStats.totalStudyTime += timeSpent || 30;

      await progress.save();

      // Check for achievements
      await checkAchievements(progress);
    }

    res.json({ message: 'Problem marked as completed', progress: progress.dsaProgress });
  } catch (error) {
    res.status(500).json({ message: 'Error updating DSA progress', error: error.message });
  }
});

// Update roadmap progress
router.post('/roadmap/update', authMiddleware, async (req, res) => {
  try {
    const { roadmapId, roadmapTitle, topicId, topicTitle, progressPercentage } = req.body;
    
    let progress = await Progress.findOne({ userId: req.user.id });
    if (!progress) {
      progress = new Progress({ userId: req.user.id });
    }

    let roadmapProgress = progress.roadmapProgress.find(r => r.roadmapId === roadmapId);
    
    if (!roadmapProgress) {
      roadmapProgress = {
        roadmapId,
        roadmapTitle,
        startedAt: new Date(),
        completedTopics: [],
        progressPercentage: 0,
        isActive: true
      };
      progress.roadmapProgress.push(roadmapProgress);
    }

    // Add completed topic if provided
    if (topicId && !roadmapProgress.completedTopics.some(t => t.topicId === topicId)) {
      roadmapProgress.completedTopics.push({
        topicId,
        topicTitle,
        completedAt: new Date()
      });

      // Add study session
      progress.studyStats.studySessions.push({
        date: new Date(),
        duration: 45, // Default 45 minutes for completing a topic
        activity: 'ROADMAP',
        focus: `${roadmapTitle} - ${topicTitle}`
      });

      progress.studyStats.totalStudyTime += 45;
    }

    // Update progress percentage
    if (progressPercentage !== undefined) {
      roadmapProgress.progressPercentage = progressPercentage;
    }

    await progress.save();
    res.json({ message: 'Roadmap progress updated', roadmapProgress });
  } catch (error) {
    res.status(500).json({ message: 'Error updating roadmap progress', error: error.message });
  }
});

// Add or update goal
router.post('/goals', authMiddleware, async (req, res) => {
  try {
    const { title, description, targetDate, category, targetValue } = req.body;
    
    let progress = await Progress.findOne({ userId: req.user.id });
    if (!progress) {
      progress = new Progress({ userId: req.user.id });
    }

    progress.goals.push({
      title,
      description,
      targetDate: new Date(targetDate),
      category,
      targetValue,
      currentValue: 0,
      createdAt: new Date()
    });

    await progress.save();
    res.json({ message: 'Goal added successfully', goals: progress.goals });
  } catch (error) {
    res.status(500).json({ message: 'Error adding goal', error: error.message });
  }
});

// Update goal progress
router.put('/goals/:goalId', authMiddleware, async (req, res) => {
  try {
    const { goalId } = req.params;
    const { currentValue, isCompleted } = req.body;
    
    let progress = await Progress.findOne({ userId: req.user.id });
    if (!progress) {
      return res.status(404).json({ message: 'Progress not found' });
    }

    const goal = progress.goals.id(goalId);
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    if (currentValue !== undefined) goal.currentValue = currentValue;
    if (isCompleted !== undefined) {
      goal.isCompleted = isCompleted;
      if (isCompleted) goal.completedAt = new Date();
    }

    await progress.save();
    res.json({ message: 'Goal updated successfully', goal });
  } catch (error) {
    res.status(500).json({ message: 'Error updating goal', error: error.message });
  }
});

// Get weekly report
router.get('/report/weekly', authMiddleware, async (req, res) => {
  try {
    const progress = await Progress.findOne({ userId: req.user.id });
    if (!progress) {
      return res.status(404).json({ message: 'Progress not found' });
    }

    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    const weeklyData = {
      problemsSolved: progress.dsaProgress.completedProblems.filter(
        p => p.completedAt >= weekAgo
      ).length,
      studyHours: Math.round(progress.studyStats.weeklyStudyTime / 60 * 10) / 10,
      topicsCompleted: progress.roadmapProgress.reduce((total, roadmap) => {
        return total + roadmap.completedTopics.filter(t => t.completedAt >= weekAgo).length;
      }, 0),
      goalsAchieved: progress.goals.filter(
        g => g.isCompleted && g.completedAt >= weekAgo
      ).length,
      currentStreak: progress.dsaProgress.currentStreak,
      studySessions: progress.studyStats.studySessions.filter(s => s.date >= weekAgo)
    };

    res.json(weeklyData);
  } catch (error) {
    res.status(500).json({ message: 'Error generating weekly report', error: error.message });
  }
});

// Achievement checker function
async function checkAchievements(progress) {
  const newAchievements = [];

  // DSA achievements
  if (progress.dsaProgress.totalSolved === 1 && !progress.achievements.some(a => a.badgeId === 'first_problem')) {
    newAchievements.push({
      badgeId: 'first_problem',
      title: 'First Steps',
      description: 'Solved your first DSA problem!',
      category: 'DSA'
    });
  }

  if (progress.dsaProgress.totalSolved === 10 && !progress.achievements.some(a => a.badgeId === 'problem_solver')) {
    newAchievements.push({
      badgeId: 'problem_solver',
      title: 'Problem Solver',
      description: 'Solved 10 DSA problems!',
      category: 'DSA'
    });
  }

  if (progress.dsaProgress.currentStreak === 7 && !progress.achievements.some(a => a.badgeId === 'week_streak')) {
    newAchievements.push({
      badgeId: 'week_streak',
      title: 'Week Warrior',
      description: '7-day solving streak!',
      category: 'Streak'
    });
  }

  // Study time achievements
  if (progress.studyStats.totalStudyTime >= 60 * 10 && !progress.achievements.some(a => a.badgeId === 'study_10h')) {
    newAchievements.push({
      badgeId: 'study_10h',
      title: 'Dedicated Learner',
      description: 'Completed 10 hours of study!',
      category: 'Study'
    });
  }

  // Add new achievements
  if (newAchievements.length > 0) {
    progress.achievements.push(...newAchievements);
    await progress.save();
  }
}

export default router;
