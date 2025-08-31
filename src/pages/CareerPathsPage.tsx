import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { careerPaths, CareerPath } from '../data/careerPathsData';
import { Layout, Server, Layers, Smartphone, GitMerge, BarChart, Cloud, Shield, ArrowRight, Search, TrendingUp, Plus } from 'lucide-react';
import AddCareerPath from '../components/career/AddCareerPath';
import { apiService } from '../services/apiService';

const CareerPathsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [demandFilter, setDemandFilter] = useState<string>('all');
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
  const [showAddCareerPathModal, setShowAddCareerPathModal] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Layout':
        return <Layout className="h-8 w-8" />;
      case 'Server':
        return <Server className="h-8 w-8" />;
      case 'Layers':
        return <Layers className="h-8 w-8" />;
      case 'Smartphone':
        return <Smartphone className="h-8 w-8" />;
      case 'GitMerge':
        return <GitMerge className="h-8 w-8" />;
      case 'BarChart':
        return <BarChart className="h-8 w-8" />;
      case 'Cloud':
        return <Cloud className="h-8 w-8" />;
      case 'Shield':
        return <Shield className="h-8 w-8" />;
      default:
        return <Layout className="h-8 w-8" />;
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'virus@123') {
      setShowPasswordModal(false);
      setShowAddCareerPathModal(true);
      setPassword('');
      setPasswordError('');
    } else {
      setPasswordError('Incorrect password');
    }
  };

  const handleAddCareerPath = async (newCareerPath: {
    name: string;
    roadmapId: string;
    skills: string;
    education: string;
    jobOutlook: string;
    relatedJobs: string;
  }) => {
    try {
      await apiService.createCareerPath(newCareerPath);
      alert('Career path added successfully!');
      setShowAddCareerPathModal(false);
    } catch (error: any) {
      alert('Failed to add career path: ' + error.message);
    }
  };

  const getDemandBadgeColor = (demand: string) => {
    switch (demand) {
      case 'High':
        return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white';
      case 'Medium':
        return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white';
      case 'Low':
        return 'bg-gradient-to-r from-red-500 to-pink-500 text-white';
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
    }
  };

  const filteredCareerPaths = careerPaths.filter(path => {
    const matchesSearch = 
      path.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      path.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      path.requiredSkills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesDemand = demandFilter === 'all' || path.demandLevel === demandFilter;
    
    return matchesSearch && matchesDemand;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-900 to-gray-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
      
      <div className="relative container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6">
              <TrendingUp className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
              Tech Career Paths
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Explore various career paths in technology to find the one that aligns with your
              interests, skills, and goals. Each path includes detailed information about required
              skills, job outlook, and potential employers.
            </p>
            
            {/* Stats */}
            <div className="flex justify-center items-center gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">{careerPaths.length}</div>
                <div className="text-sm text-gray-400">Career Paths</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-400">{careerPaths.filter(p => p.demandLevel === 'High').length}</div>
                <div className="text-sm text-gray-400">High Demand</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-400">{careerPaths.reduce((acc, path) => acc + path.requiredSkills.length, 0)}</div>
                <div className="text-sm text-gray-400">Total Skills</div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="glass-card p-6 mb-8 animate-slide-up">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="flex-1 relative max-w-md">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search career paths..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-300 whitespace-nowrap">
                  Filter by demand:
                </span>
                <select
                  value={demandFilter}
                  onChange={(e) => setDemandFilter(e.target.value)}
                  className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">All Levels</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Add Career Path Button */}
          <div className="mb-6 flex justify-end">
            <button
              onClick={() => setShowPasswordModal(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Career Path</span>
            </button>
          </div>

          {/* Career Paths Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredCareerPaths.map((career: CareerPath, index) => (
              <Link
                key={career.id}
                to={`/career-paths/${career.id}`}
                className="group block animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="glass-card p-6 hover:scale-105 transition-all duration-300">
                  <div className="flex items-start mb-4">
                    <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mr-4 text-white">
                      {getIconComponent(career.icon)}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                        <h2 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                          {career.title}
                        </h2>
                        <span className={`text-xs px-3 py-1 rounded-full font-medium ${getDemandBadgeColor(career.demandLevel)}`}>
                          {career.demandLevel} Demand
                        </span>
                      </div>
                      <p className="text-gray-300 leading-relaxed">
                        {career.description}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-gray-700 pt-4 mb-4">
                    <h3 className="text-sm font-semibold text-gray-300 mb-3">
                      Required Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {career.requiredSkills.slice(0, 5).map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="text-xs px-3 py-1 bg-gray-700 text-gray-300 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                      {career.requiredSkills.length > 5 && (
                        <span className="text-xs px-3 py-1 bg-gray-700 text-gray-300 rounded-full">
                          +{career.requiredSkills.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-300">
                      <span className="font-medium">Avg. Salary:</span> 
                      <span className="text-purple-400 font-semibold ml-1">{career.averageSalary}</span>
                    </div>
                    <div className="inline-flex items-center text-sm font-medium text-purple-400 group-hover:text-purple-300 transition-colors">
                      Learn More
                      <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {filteredCareerPaths.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No Career Paths Found
              </h3>
              <p className="text-gray-400 mb-6">
                Try adjusting your search criteria or filters
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setDemandFilter('all');
                }}
                className="btn-secondary"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <div className="glass-card p-8 animate-fade-in">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Start Your Tech Journey?
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Explore detailed career paths, learn about required skills, and discover opportunities in the tech industry.
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

      {/* Add Career Path Modal */}
      {showAddCareerPathModal && (
        <AddCareerPath
          onAdd={handleAddCareerPath}
          onCancel={() => setShowAddCareerPathModal(false)}
        />
      )}
    </div>
  );
};

export default CareerPathsPage;