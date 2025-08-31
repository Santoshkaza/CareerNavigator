import { useState } from 'react';
import { roadmaps, Roadmap } from '../data/roadmapsData';
import { Link } from 'react-router-dom';
import { Layout, Server, Layers, Smartphone, ArrowRight, Bookmark, BookmarkCheck, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const RoadmapsPage = () => {
  const { isAuthenticated } = useAuth();
  const [savedRoadmaps, setSavedRoadmaps] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const getIconComponent = (iconName: string) => {
    const iconProps = "h-8 w-8";
    switch (iconName) {
      case 'Layout':
        return <Layout className={`${iconProps} text-blue-400`} />;
      case 'Server':
        return <Server className={`${iconProps} text-purple-400`} />;
      case 'Layers':
        return <Layers className={`${iconProps} text-emerald-400`} />;
      case 'Smartphone':
        return <Smartphone className={`${iconProps} text-orange-400`} />;
      default:
        return <Layout className={`${iconProps} text-blue-400`} />;
    }
  };

  const getGradientColors = (iconName: string) => {
    switch (iconName) {
      case 'Layout':
        return 'from-blue-500 to-cyan-500';
      case 'Server':
        return 'from-purple-500 to-pink-500';
      case 'Layers':
        return 'from-emerald-500 to-teal-500';
      case 'Smartphone':
        return 'from-orange-500 to-rose-500';
      default:
        return 'from-blue-500 to-cyan-500';
    }
  };

  const handleToggleSave = (roadmapId: string) => {
    if (!isAuthenticated) return;
    
    setSavedRoadmaps((prev) => {
      if (prev.includes(roadmapId)) {
        return prev.filter(id => id !== roadmapId);
      } else {
        return [...prev, roadmapId];
      }
    });
  };

  const filteredRoadmaps = roadmaps.filter(roadmap => 
    roadmap.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    roadmap.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Technology Roadmaps
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Follow structured learning paths to master new technologies and advance your career.
              Each roadmap provides a step-by-step guide with recommended resources.
            </p>
          </div>

          {/* Search Section */}
          <div className="mb-12">
            <div className="relative max-w-md mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search roadmaps..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-lg transition-all duration-200"
              />
            </div>
          </div>

          {/* Roadmaps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRoadmaps.map((roadmap: Roadmap) => (
              <div
                key={roadmap.id}
                className="group card-gradient hover:border-indigo-400 dark:hover:border-indigo-300 hover:shadow-2xl p-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-4 rounded-full bg-gradient-to-r ${getGradientColors(roadmap.icon)} bg-opacity-10`}>
                    {getIconComponent(roadmap.icon)}
                  </div>
                  {isAuthenticated && (
                    <button
                      onClick={() => handleToggleSave(roadmap.id)}
                      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                      aria-label={savedRoadmaps.includes(roadmap.id) ? 'Remove from saved' : 'Save roadmap'}
                    >
                      {savedRoadmaps.includes(roadmap.id) ? (
                        <BookmarkCheck className="h-5 w-5 text-indigo-500" />
                      ) : (
                        <Bookmark className="h-5 w-5 text-gray-400 hover:text-indigo-500" />
                      )}
                    </button>
                  )}
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {roadmap.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {roadmap.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {roadmap.steps.length} steps
                  </span>
                  <Link
                    to={`/roadmaps/${roadmap.id}`}
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg border-2 border-transparent hover:border-indigo-300"
                  >
                    View Roadmap
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredRoadmaps.length === 0 && (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center">
                  <Search className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No roadmaps found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your search terms to find what you're looking for.
                </p>
              </div>
            </div>
          )}

          {/* Call to Action for Non-Authenticated Users */}
          {!isAuthenticated && (
            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-indigo-200 dark:border-indigo-800">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Save Your Progress
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Sign up to save roadmaps, track your progress, and unlock personalized learning features.
                </p>
                <Link
                  to="/signup"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg border-2 border-transparent hover:border-indigo-300"
                >
                  Get Started Free
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoadmapsPage;
