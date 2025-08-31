import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/apiService';
import { ArrowRight, CheckSquare, Square, Search, Code } from 'lucide-react';
import { Link } from 'react-router-dom';

type DSAProblem = {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  url: string;
  companies: string[];
};

type DSACategory = {
  id: string;
  name: string;
  description: string;
  problems: DSAProblem[];
};

const DSASheetsPage = () => {
  const { isAuthenticated } = useAuth();
  const [activeCategory, setActiveCategory] = useState<string>('arrays');
  const [difficulty, setDifficulty] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [completedProblems, setCompletedProblems] = useState<string[]>([]);
  const [dsaCategories, setDsaCategories] = useState<DSACategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
  const [showAddProblemModal, setShowAddProblemModal] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [newProblem, setNewProblem] = useState({
    id: '',
    title: '',
    description: '',
    difficulty: 'easy' as 'easy' | 'medium' | 'hard',
    category: '',
    url: '',
    companies: [] as string[]
  });
  const [companiesInput, setCompaniesInput] = useState<string>('');

  useEffect(() => {
    const loadUserProgress = async () => {
      if (isAuthenticated) {
        try {
          const progress = await apiService.getUserProgress();
          const completedIds = progress.dsaProgress.completedProblems.map((p: any) => p.problemId);
          setCompletedProblems(completedIds);
        } catch (error) {
          console.error('Failed to load user progress:', error);
        }
      }
    };

    loadUserProgress();
  }, [isAuthenticated]);

  useEffect(() => {
    const loadDSAProblems = async () => {
      try {
        setLoading(true);
        const problems = await apiService.getDSAProblems();
        const categories = await apiService.getDSACategories();

        // Group problems by category
        const categoryMap: { [key: string]: DSACategory } = {};

        categories.forEach((category: string) => {
          categoryMap[category] = {
            id: category,
            name: category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' '),
            description: `Problems related to ${category.replace('-', ' ')}`,
            problems: []
          };
        });

        problems.forEach((problem: DSAProblem) => {
          if (categoryMap[problem.category]) {
            categoryMap[problem.category].problems.push(problem);
          }
        });

        const categoriesArray = Object.values(categoryMap);
        setDsaCategories(categoriesArray);
      } catch (error) {
        console.error('Failed to load DSA problems:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDSAProblems();
  }, []);

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'virus@123') {
      setShowPasswordModal(false);
      setShowAddProblemModal(true);
      setPassword('');
      setPasswordError('');
    } else {
      setPasswordError('Incorrect password');
    }
  };

  const handleAddProblemSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Convert companies string to array
      const companiesArray = companiesInput.split(',').map(company => company.trim()).filter(company => company);

      const problemData = {
        ...newProblem,
        companies: companiesArray
      };

      await apiService.createDSAProblem(problemData);

      // Refresh the problems list
      const problems = await apiService.getDSAProblems();
      const categories = await apiService.getDSACategories();

      const categoryMap: { [key: string]: DSACategory } = {};

      categories.forEach((category: string) => {
        categoryMap[category] = {
          id: category,
          name: category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' '),
          description: `Problems related to ${category.replace('-', ' ')}`,
          problems: []
        };
      });

      problems.forEach((problem: DSAProblem) => {
        if (categoryMap[problem.category]) {
          categoryMap[problem.category].problems.push(problem);
        }
      });

      const categoriesArray = Object.values(categoryMap);
      setDsaCategories(categoriesArray);

      // Reset form and close modal
      setNewProblem({
        id: '',
        title: '',
        description: '',
        difficulty: 'easy',
        category: '',
        url: '',
        companies: []
      });
      setCompaniesInput('');
      setShowAddProblemModal(false);

      alert('Problem added successfully!');
    } catch (error: any) {
      alert('Failed to add problem: ' + error.message);
    }
  };

  const handleNewProblemChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewProblem(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleToggleComplete = async (problemId: string) => {
    if (!isAuthenticated) return;

    const problem = activeProblems.find(p => p.id === problemId);
    if (!problem) return;

    try {
      if (completedProblems.includes(problemId)) {
        // Optimistically update UI
        setCompletedProblems(prev => prev.filter(id => id !== problemId));
        // Optionally, call API to unmark completion if supported
      } else {
        // Call API to mark problem as completed
        await apiService.markDSAProblemComplete({
          problemId,
          difficulty: problem.difficulty.toUpperCase(),
          timeSpent: 30, // default time spent, can be adjusted
          attempts: 1
        });
        setCompletedProblems(prev => [...prev, problemId]);
      }
    } catch (error) {
      console.error('Failed to update problem completion:', error);
      // Optionally show error feedback to user
    }
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff.toLowerCase()) {
      case 'easy':
        return 'from-green-500 to-emerald-500';
      case 'medium':
        return 'from-yellow-500 to-orange-500';
      case 'hard':
        return 'from-red-500 to-pink-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const activeProblems = dsaCategories.find((cat: DSACategory) => cat.id === activeCategory)?.problems || [];

  const filteredProblems = activeProblems.filter((problem: DSAProblem) => {
    const matchesDifficulty = difficulty === 'all' || problem.difficulty.toLowerCase() === difficulty.toLowerCase();
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      problem.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDifficulty && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-900 to-gray-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
      
      <div className="relative container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6">
              <Code className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
              DSA Practice Sheets
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Master Data Structures and Algorithms with our curated collection of problems.
              Practice systematically and track your progress.
            </p>
            
            {/* Stats */}
            <div className="flex justify-center items-center gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">{dsaCategories.length}</div>
                <div className="text-sm text-gray-400">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-400">{dsaCategories.reduce((acc, cat) => acc + cat.problems.length, 0)}</div>
                <div className="text-sm text-gray-400">Problems</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-400">{completedProblems.length}</div>
                <div className="text-sm text-gray-400">Completed</div>
              </div>
            </div>
          </div>

          {/* Add Problem Button */}
          <div className="mb-6 flex justify-end">
            <button
              onClick={() => setShowPasswordModal(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2"
            >
              <Code className="h-4 w-4" />
              <span>Add Problem</span>
            </button>
          </div>

          {/* Search and Filters */}
          <div className="glass-card p-6 mb-8 animate-slide-up">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search problems..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Categories Sidebar */}
            <div className="lg:col-span-1">
              <div className="glass-card p-6 animate-slide-up">
                <h2 className="text-xl font-semibold text-white mb-6">Categories</h2>
                <nav className="space-y-2">
                  {dsaCategories.map((category, index) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 animate-fade-in ${
                        activeCategory === category.id
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{category.name}</span>
                        <span className="text-sm opacity-75">{category.problems.length}</span>
                      </div>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Problems List */}
            <div className="lg:col-span-3">
              <div className="space-y-4">
                {filteredProblems.map((problem, index) => (
                  <div
                    key={problem.id}
                    className="glass-card p-6 hover:bg-white/10 transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <button
                            onClick={() => handleToggleComplete(problem.id)}
                            className="text-purple-400 hover:text-purple-300 transition-colors"
                            disabled={!isAuthenticated}
                          >
                            {completedProblems.includes(problem.id) ? (
                              <CheckSquare className="h-5 w-5" />
                            ) : (
                              <Square className="h-5 w-5" />
                            )}
                          </button>
                          <h3 className="text-lg font-semibold text-white">{problem.title}</h3>
                        </div>
                        <p className="text-gray-300 mb-4 leading-relaxed">{problem.description}</p>
                        
                        {problem.companies && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {problem.companies.map((company: string, companyIndex: number) => (
                              <span
                                key={companyIndex}
                                className="px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded-full"
                              >
                                {company}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col items-end gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getDifficultyColor(problem.difficulty)} text-white`}>
                          {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                        </span>
                        {problem.url && (
                          <a
                            href={problem.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm font-medium"
                          >
                            Solve
                            <ArrowRight className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredProblems.length === 0 && (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    No Problems Found
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Try adjusting your search criteria or select a different category
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setDifficulty('all');
                    }}
                    className="btn-secondary"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <div className="glass-card p-8 animate-fade-in">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Start Coding?
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Practice these problems systematically to build your problem-solving skills and ace technical interviews.
              </p>
              <Link to="/roadmaps" className="btn-primary px-8 py-3 inline-block">
                View Learning Roadmaps
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Enter Admin Password
            </h3>
            <form onSubmit={handlePasswordSubmit}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent mb-4"
                required
              />
              {passwordError && (
                <p className="text-red-500 text-sm mb-4">{passwordError}</p>
              )}
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPassword('');
                    setPasswordError('');
                  }}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Problem Modal */}
      {showAddProblemModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Add New DSA Problem
            </h3>
            <form onSubmit={handleAddProblemSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Problem ID *
                  </label>
                  <input
                    type="text"
                    name="id"
                    value={newProblem.id}
                    onChange={handleNewProblemChange}
                    placeholder="e.g., two-sum"
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={newProblem.title}
                    onChange={handleNewProblemChange}
                    placeholder="e.g., Two Sum"
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={newProblem.description}
                  onChange={handleNewProblemChange}
                  placeholder="Describe the problem..."
                  rows={3}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Difficulty *
                  </label>
                  <select
                    name="difficulty"
                    value={newProblem.difficulty}
                    onChange={handleNewProblemChange}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={newProblem.category}
                    onChange={handleNewProblemChange}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select a category</option>
                    {dsaCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    URL
                  </label>
                  <input
                    type="url"
                    name="url"
                    value={newProblem.url}
                    onChange={handleNewProblemChange}
                    placeholder="https://..."
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Companies (comma-separated)
                </label>
                <input
                  type="text"
                  value={companiesInput}
                  onChange={(e) => setCompaniesInput(e.target.value)}
                  placeholder="e.g., Google, Amazon, Microsoft"
                  className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddProblemModal(false);
                    setNewProblem({
                      id: '',
                      title: '',
                      description: '',
                      difficulty: 'easy',
                      category: '',
                      url: '',
                      companies: []
                    });
                    setCompaniesInput('');
                  }}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Add Problem
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DSASheetsPage;