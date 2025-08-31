import { BarChart, BookOpen, Code, Layers, Layout, Search, Server, Smartphone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  const features = [
    {
      title: 'DSA Sheets',
      description: 'Master data structures and algorithms with curated problem sets.',
      icon: <Code className="h-10 w-10 text-blue-500" />,
      path: '/dsa-sheets',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Tech Roadmaps',
      description: 'Follow structured learning paths for different tech careers.',
      icon: <BookOpen className="h-10 w-10 text-purple-500" />,
      path: '/roadmaps',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Interview Questions',
      description: 'Practice with real interview questions from top companies.',
      icon: <Search className="h-10 w-10 text-emerald-500" />,
      path: '/companies',
      gradient: 'from-emerald-500 to-teal-500',
    },
    {
      title: 'Career Paths',
      description: 'Explore various tech careers and find your perfect fit.',
      icon: <BarChart className="h-10 w-10 text-orange-500" />,
      path: '/career-paths',
      gradient: 'from-orange-500 to-rose-500',
    },
  ];

  const careerOptions = [
    {
      title: 'Frontend Development',
      icon: <Layout className="h-8 w-8 text-blue-400" />,
      path: '/career-paths/frontend-developer',
      gradient: 'from-blue-400 to-cyan-500',
    },
    {
      title: 'Backend Development',
      icon: <Server className="h-8 w-8 text-purple-400" />,
      path: '/career-paths/backend-developer',
      gradient: 'from-purple-400 to-pink-500',
    },
    {
      title: 'Full Stack Development',
      icon: <Layers className="h-8 w-8 text-emerald-400" />,
      path: '/career-paths/fullstack-developer',
      gradient: 'from-emerald-400 to-teal-500',
    },
    {
      title: 'Mobile Development',
      icon: <Smartphone className="h-8 w-8 text-orange-400" />,
      path: '/career-paths/mobile-developer',
      gradient: 'from-orange-400 to-red-500',
    },
  ];

  const filteredFeatures = features.filter(feature => 
    feature.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    feature.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Navigate Your Tech Career
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Curated resources, roadmaps, and guidance to help you excel in your
              software development journey with confidence.
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
                placeholder="Search features..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-lg transition-all duration-200"
              />
            </div>
          </div>

          {/* Main Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
            {filteredFeatures.map((feature, index) => (
              <div
                key={index}
                className="group card-gradient hover:border-indigo-400 dark:hover:border-indigo-300 hover:shadow-2xl p-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-4 rounded-full bg-gradient-to-r ${feature.gradient} bg-opacity-10`}>
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {feature.description}
                </p>
                <div className="flex items-center justify-end">
                  <Link
                    to={feature.path}
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg border-2 border-transparent hover:border-indigo-300"
                  >
                    Explore
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Career Options Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                Career Paths
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Explore different technology career paths and find the one that suits your interests and goals.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {careerOptions.map((career, index) => (
                <Link
                  key={index}
                  to={career.path}
                  className="group card-gradient hover:border-indigo-400 dark:hover:border-indigo-300 hover:shadow-xl p-6 text-center"
                >
                  <div className={`p-3 rounded-full bg-gradient-to-r ${career.gradient} bg-opacity-10 w-fit mx-auto mb-4`}>
                    {career.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                    {career.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>

          {/* No Results */}
          {filteredFeatures.length === 0 && (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center">
                  <Search className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No features found
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
                  Start Your Journey Today
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Join thousands of developers who are advancing their careers with our platform.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/signup"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg border-2 border-transparent hover:border-indigo-300"
                  >
                    Get Started Free
                  </Link>
                  <Link
                    to="/roadmaps"
                    className="inline-flex items-center px-6 py-3 bg-transparent text-indigo-600 dark:text-indigo-400 border-2 border-indigo-600 dark:border-indigo-400 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-200"
                  >
                    Explore Roadmaps
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
