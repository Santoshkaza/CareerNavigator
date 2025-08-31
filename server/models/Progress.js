import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  
  // DSA Progress
  dsaProgress: {
    completedProblems: [{ 
      problemId: String,
      difficulty: { type: String, enum: ['EASY', 'MEDIUM', 'HARD'] },
      completedAt: { type: Date, default: Date.now },
      timeSpent: Number, // in minutes
      attempts: { type: Number, default: 1 }
    }],
    totalSolved: { type: Number, default: 0 },
    easyCount: { type: Number, default: 0 },
    mediumCount: { type: Number, default: 0 },
    hardCount: { type: Number, default: 0 },
    currentStreak: { type: Number, default: 0 },
    maxStreak: { type: Number, default: 0 },
    lastSolvedDate: Date
  },

  // Roadmap Progress
  roadmapProgress: [{
    roadmapId: String,
    roadmapTitle: String,
    startedAt: { type: Date, default: Date.now },
    completedTopics: [{ 
      topicId: String,
      topicTitle: String,
      completedAt: { type: Date, default: Date.now }
    }],
    currentTopicId: String,
    progressPercentage: { type: Number, default: 0 },
    estimatedCompletion: Date,
    isActive: { type: Boolean, default: true }
  }],

  // Learning Goals
  goals: [{
    title: String,
    description: String,
    targetDate: Date,
    category: { type: String, enum: ['DSA', 'ROADMAP', 'CAREER', 'CUSTOM'] },
    targetValue: Number, // e.g., solve 100 problems
    currentValue: { type: Number, default: 0 },
    isCompleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    completedAt: Date
  }],

  // Career Path Progress
  careerPathProgress: [{
    pathId: String,
    pathTitle: String,
    startedAt: { type: Date, default: Date.now },
    milestones: [{
      milestoneId: String,
      title: String,
      isCompleted: { type: Boolean, default: false },
      completedAt: Date
    }],
    progressPercentage: { type: Number, default: 0 }
  }],

  // Study Statistics
  studyStats: {
    totalStudyTime: { type: Number, default: 0 }, // in minutes
    weeklyStudyTime: { type: Number, default: 0 },
    dailyAverage: { type: Number, default: 0 },
    studySessions: [{
      date: { type: Date, default: Date.now },
      duration: Number, // in minutes
      activity: String, // 'DSA', 'ROADMAP', 'READING', etc.
      focus: String // specific topic or problem
    }],
    lastActiveDate: { type: Date, default: Date.now }
  },

  // Achievements/Badges
  achievements: [{
    badgeId: String,
    title: String,
    description: String,
    earnedAt: { type: Date, default: Date.now },
    category: String
  }],

  // Weekly/Monthly Reports
  weeklyReport: {
    weekStarting: Date,
    problemsSolved: { type: Number, default: 0 },
    studyHours: { type: Number, default: 0 },
    topicsCompleted: { type: Number, default: 0 },
    goalsAchieved: { type: Number, default: 0 }
  }

}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for overall completion percentage
progressSchema.virtual('overallProgress').get(function() {
  const dsaWeight = 0.4;
  const roadmapWeight = 0.4;
  const careerWeight = 0.2;
  
  const dsaProgress = Math.min((this.dsaProgress.totalSolved / 150) * 100, 100); // Assume 150 total problems
  const avgRoadmapProgress = this.roadmapProgress.length > 0 
    ? this.roadmapProgress.reduce((sum, r) => sum + r.progressPercentage, 0) / this.roadmapProgress.length 
    : 0;
  const avgCareerProgress = this.careerPathProgress.length > 0
    ? this.careerPathProgress.reduce((sum, c) => sum + c.progressPercentage, 0) / this.careerPathProgress.length
    : 0;

  return Math.round(dsaProgress * dsaWeight + avgRoadmapProgress * roadmapWeight + avgCareerProgress * careerWeight);
});

// Index for efficient queries
progressSchema.index({ userId: 1 });
progressSchema.index({ 'dsaProgress.lastSolvedDate': -1 });
progressSchema.index({ 'studyStats.lastActiveDate': -1 });

export default mongoose.model('Progress', progressSchema);
