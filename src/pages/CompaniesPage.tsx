import React, { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';
import { Search, ExternalLink, Filter, Building2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

type CompanyQuestion = {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  url?: string;
  solution?: string;
};

type Company = {
  id: string;
  name: string;
  logo: string;
  description: string;
  questions: CompanyQuestion[];
};

const CompaniesPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCompanyId, setActiveCompanyId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchCompanies();
  }, [searchTerm]);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getCompanies(searchTerm || undefined);
      setCompanies(data);
    } catch (err) {
      setError('Failed to load companies. Please try again.');
      console.error('Error fetching companies:', err);
    } finally {
      setLoading(false);
    }
  };

  const activeCompany = activeCompanyId 
    ? companies.find(company => company.id === activeCompanyId) 
    : null;

  const filteredQuestions = activeCompany?.questions?.filter(question => {
    const matchesDifficulty = difficultyFilter === 'all' || question.difficulty === difficultyFilter;
    const matchesCategory = categoryFilter === 'all' || question.category.toLowerCase() === categoryFilter.toLowerCase();
    return matchesDifficulty && matchesCategory;
  }) || [];

  // Get unique categories from all questions
  const allCategories = Array.from(
    new Set(
      companies.flatMap(company => 
        company.questions?.map(q => q.category) || []
      )
    )
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'hard': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Loading companies...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Error Loading Companies
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
              <button
                onClick={fetchCompanies}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Top Tech Companies
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Explore interview questions and insights from leading technology companies worldwide.
            </p>
          </div>

          {/* Search Section */}
          <div className="mb-8">
            <div className="relative max-w-md mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-lg transition-all duration-200"
              />
            </div>
          </div>

          {!activeCompany ? (
            <>
              {/* Companies Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {companies.map((company) => (
                  <div
                    key={company.id}
                    onClick={() => setActiveCompanyId(company.id)}
                    className="group card-gradient hover:border-indigo-400 dark:hover:border-indigo-300 hover:shadow-2xl p-8 cursor-pointer"
                  >
                    <div className="flex items-center justify-center mb-6">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">
                        {company.logo ? (
                          <img 
                            src={company.logo} 
                            alt={`${company.name} logo`}
                            className="w-12 h-12 object-contain"
                          />
                        ) : (
                          <Building2 className="h-8 w-8 text-gray-400" />
                        )}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                      {company.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-center mb-6 leading-relaxed">
                      {company.description}
                    </p>
                    <div className="text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                        {company.questions?.length || 0} Questions
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* No Results */}
              {companies.length === 0 && (
                <div className="text-center py-16">
                  <div className="max-w-md mx-auto">
                    <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center">
                      <Search className="h-10 w-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      No companies found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Try adjusting your search terms to find what you're looking for.
                    </p>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Company Detail View */}
              <div className="mb-8">
                <button
                  onClick={() => setActiveCompanyId(null)}
                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 mb-4 font-medium"
                >
                  ← Back to Companies
                </button>
                
                <div className="card-gradient p-8 mb-8">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md mr-6">
                      {activeCompany.logo ? (
                        <img 
                          src={activeCompany.logo} 
                          alt={`${activeCompany.name} logo`}
                          className="w-12 h-12 object-contain"
                        />
                      ) : (
                        <Building2 className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        {activeCompany.name}
                      </h1>
                      <p className="text-gray-600 dark:text-gray-400 mt-2">
                        {activeCompany.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Filters */}
                <div className="mb-6">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </button>

                  {showFilters && (
                    <div className="mt-4 p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Difficulty
                          </label>
                          <select
                            value={difficultyFilter}
                            onChange={(e) => setDifficultyFilter(e.target.value)}
                            className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          >
                            <option value="all">All Difficulties</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Category
                          </label>
                          <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          >
                            <option value="all">All Categories</option>
                            {allCategories.map(category => (
                              <option key={category} value={category}>{category}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Questions List */}
                <div className="space-y-4">
                  {filteredQuestions.map((question) => (
                    <div key={question.id} className="card-gradient p-6">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex-1">
                          {question.title}
                        </h3>
                        <span className={`ml-4 px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(question.difficulty)}`}>
                          {question.difficulty.toLowerCase()}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                        {question.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Category: {question.category}
                        </span>
                        {question.url && (
                          <a
                            href={question.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 text-sm font-medium"
                          >
                            View Problem
                            <ExternalLink className="ml-1 h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}

                  {filteredQuestions.length === 0 && (
                    <div className="text-center py-12">
                      <div className="max-w-md mx-auto">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center">
                          <Filter className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          No questions found
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          Try adjusting your filters to see more questions.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Call to Action for Non-Authenticated Users */}
          {!isAuthenticated && (
            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-indigo-200 dark:border-indigo-800">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Ready to Practice?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Sign up to track your progress and access exclusive interview preparation materials.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg border-2 border-transparent hover:border-indigo-300">
                    Get Started Free
                  </button>
                  <button className="inline-flex items-center px-6 py-3 bg-transparent text-indigo-600 dark:text-indigo-400 border-2 border-indigo-600 dark:border-indigo-400 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-200">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompaniesPage;
