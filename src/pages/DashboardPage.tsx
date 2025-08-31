import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { progressService } from '../services/progressService';
import { 
  Bookmark, CheckCircle, Code, TrendingUp, Users, ArrowRight, Search, 
  Target, Trophy, Calendar, Clock, BarChart3, Flame, Star, Plus,
  BookOpen, Zap, Award, Activity
} from 'lucide-react';

type DashboardData = {
  overallProgress: number;
  dsaProgress: {
    totalSolved: number;
    easyCount: number;
    mediumCount: number;
    hardCount: number;
    currentStreak: number;
    maxStreak: number;
    completedProblems: Array<{
      problemId: string;
      difficulty: string;
      completedAt: string;
      timeSpent: number;
    }>;
  };
  roadmapProgress: Array<{
    roadmapId: string;
    roadmapTitle: string;
    progressPercentage: number;
    completedTopics: Array<{
      topicId: string;
      topicTitle: string;
      completedAt: string;
    }>;
    isActive: boolean;
  }>;
  goals: Array<{
    _id: string;
    title: string;
    description: string;
    targetDate: string;
    category: string;
    targetValue: number;
    currentValue: number;
    isCompleted: boolean;
  }>;
  studyStats: {
    totalStudyTime: number;
    weeklyStudyTime: number;
    studySessions: Array<{
      date: string;
      duration: number;
      activity: string;
      focus: string;
    }>;
  };
  achievements: Array<{
    badgeId: string;
    title: string;
    description: string;
    earnedAt: string;
    category: string;
  }>;
};

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [weeklyReport, setWeeklyReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    targetDate: '',
    category: 'DSA' as 'DSA' | 'ROADMAP' | 'CAREER' | 'CUSTOM',
    targetValue: 10
  });

  useEffect(() => {
    fetchDashboardData();
    fetchWeeklyReport();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const data = await progressService.getDashboardData();
      setDashboardData(data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeeklyReport = async () => {
    try {
      const report = await progressService.getWeeklyReport();
      setWeeklyReport(report);
    } catch (error) {
      console.error('Error fetching weekly report:', error);
    }
  };

  const handleAddGoal = async () => {
    try {
      await progressService.addGoal(newGoal);
      setShowGoalModal(false);
      setNewGoal({
        title: '',
        description: '',
        targetDate: '',
        category: 'DSA',
        targetValue: 10
      });
      fetchDashboardData();
    } catch (error) {
      console.error('Error adding goal:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const progressStats = [
    {
      title: 'Overall Progress',
      value: `${dashboardData?.overallProgress || 0}%`,
      icon: <BarChart3 className="h-8 w-8 text-indigo-600" />,
      color: 'indigo',
      description: 'Your learning journey'
    },
    {
      title: 'Problems Solved',
      value: dashboardData?.dsaProgress.totalSolved || 0,
      icon: <Code className="h-8 w-8 text-green-600" />,
      color: 'green',
      description: `${dashboardData?.dsaProgress.easyCount || 0}E • ${dashboardData?.dsaProgress.mediumCount || 0}M • ${dashboardData?.dsaProgress.hardCount || 0}H`
    },
    {
      title: 'Current Streak',
      value: `${dashboardData?.dsaProgress.currentStreak || 0} days`,
      icon: <Flame className="h-8 w-8 text-orange-600" />,
      color: 'orange',
      description: `Max: ${dashboardData?.dsaProgress.maxStreak || 0} days`
    },
    {
      title: 'Study Hours',
      value: `${Math.round((dashboardData?.studyStats.totalStudyTime || 0) / 60)}h`,
      icon: <Clock className="h-8 w-8 text-purple-600" />,
      color: 'purple',
      description: `${Math.round((dashboardData?.studyStats.weeklyStudyTime || 0) / 60)}h this week`
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user?.username}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Here's your personalized learning progress and achievements
          </p>
        </div>

        {/* Progress Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {progressStats.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {stat.description}
                  </p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: 'Continue DSA Practice',
                description: 'Resume solving problems',
                icon: <Code className="h-6 w-6 text-blue-500" />,
                path: '/dsa-sheets',
                gradient: 'from-blue-500 to-cyan-500',
              },
              {
                title: 'Follow Roadmaps',
                description: 'Continue learning paths',
                icon: <TrendingUp className="h-6 w-6 text-purple-500" />,
                path: '/roadmaps',
                gradient: 'from-purple-500 to-pink-500',
              },
              {
                title: 'Practice Interviews',
                description: 'Company questions',
                icon: <Users className="h-6 w-6 text-emerald-500" />,
                path: '/companies',
                gradient: 'from-emerald-500 to-teal-500',
              },
              {
                title: 'Set New Goal',
                description: 'Track your progress',
                icon: <Target className="h-6 w-6 text-orange-500" />,
                onClick: () => setShowGoalModal(true),
                gradient: 'from-orange-500 to-red-500',
              },
            ].map((action, index) => (
              <div key={index} className="relative group">
                {action.path ? (
                  <Link to={action.path} className="block">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                      <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${action.gradient} mb-4`}>
                        {action.icon}
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {action.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        {action.description}
                      </p>
                      <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                    </div>
                  </Link>
                ) : (
                  <button onClick={action.onClick} className="block w-full text-left">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                      <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${action.gradient} mb-4`}>
                        {action.icon}
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {action.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        {action.description}
                      </p>
                      <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                    </div>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Goals */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Active Goals
                  </h2>
                  <button
                    onClick={() => setShowGoalModal(true)}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Goal
                  </button>
                </div>
              </div>
              <div className="p-6">
                {dashboardData?.goals && dashboardData.goals.length > 0 ? (
                  <div className="space-y-4">
                    {dashboardData.goals.filter(goal => !goal.isCompleted).map((goal) => (
                      <div key={goal._id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            {goal.title}
                          </h3>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            goal.category === 'DSA' ? 'bg-blue-100 text-blue-800' :
                            goal.category === 'ROADMAP' ? 'bg-purple-100 text-purple-800' :
                            goal.category === 'CAREER' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {goal.category}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          {goal.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex-1 mr-4">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-indigo-600 h-2 rounded-full" 
                                style={{ width: `${Math.min((goal.currentValue / goal.targetValue) * 100, 100)}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              {goal.currentValue} / {goal.targetValue}
                            </p>
                          </div>
                          <p className="text-xs text-gray-500">
                            Due: {new Date(goal.targetDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Target className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No goals yet</h3>
                    <p className="mt-1 text-sm text-gray-500">Get started by setting your first learning goal.</p>
                    <button
                      onClick={() => setShowGoalModal(true)}
                      className="mt-3 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add your first goal
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Recent Activity & Achievements */}
          <div className="space-y-6">
            {/* Recent Achievements */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Recent Achievements
                </h2>
              </div>
              <div className="p-6">
                {dashboardData?.achievements && dashboardData.achievements.length > 0 ? (
                  <div className="space-y-3">
                    {dashboardData.achievements.slice(-3).map((achievement, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                        <Trophy className="h-8 w-8 text-yellow-600" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white text-sm">
                            {achievement.title}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <Award className="mx-auto h-8 w-8 text-gray-400" />
                    <p className="text-sm text-gray-500 mt-2">No achievements yet</p>
                    <p className="text-xs text-gray-400">Keep learning to earn badges!</p>
                  </div>
                )}
              </div>
            </div>

            {/* Weekly Summary */}
            {weeklyReport && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    This Week
                  </h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-indigo-600">
                        {weeklyReport.problemsSolved}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Problems Solved</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">
                        {weeklyReport.studyHours}h
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Study Hours</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">
                        {weeklyReport.topicsCompleted}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Topics Done</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-orange-600">
                        {weeklyReport.currentStreak}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Day Streak</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Goal Modal */}
        {showGoalModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Set New Goal
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Goal Title
                  </label>
                  <input
                    type="text"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="e.g., Solve 50 DSA problems"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description (optional)
                  </label>
                  <textarea
                    value={newGoal.description}
                    onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    rows={3}
                    placeholder="Describe your goal..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Category
                    </label>
                    <select
                      value={newGoal.category}
                      onChange={(e) => setNewGoal({...newGoal, category: e.target.value as any})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="DSA">DSA Practice</option>
                      <option value="ROADMAP">Learning Path</option>
                      <option value="CAREER">Career Goal</option>
                      <option value="CUSTOM">Custom</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Target Value
                    </label>
                    <input
                      type="number"
                      value={newGoal.targetValue}
                      onChange={(e) => setNewGoal({...newGoal, targetValue: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      min="1"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Target Date
                  </label>
                  <input
                    type="date"
                    value={newGoal.targetDate}
                    onChange={(e) => setNewGoal({...newGoal, targetDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowGoalModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddGoal}
                  disabled={!newGoal.title || !newGoal.targetDate}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-lg"
                >
                  Add Goal
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
