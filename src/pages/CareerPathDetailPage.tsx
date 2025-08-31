import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { careerPaths } from '../data/careerPathsData';
import { roadmaps } from '../data/roadmapsData';
import { Layout, Server, Layers, Smartphone, GitMerge, BarChart, Cloud, Shield, ArrowLeft, ArrowRight, Briefcase, GraduationCap as Graduation, TrendingUp, Building } from 'lucide-react';

const CareerPathDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  const careerPath = careerPaths.find(cp => cp.id === id);
  const relatedRoadmap = careerPath?.roadmapId 
    ? roadmaps.find(r => r.id === careerPath.roadmapId) 
    : null;

  if (!careerPath) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors duration-300">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Career path not found
          </h1>
          <Link
            to="/career-paths"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Career Paths
          </Link>
        </div>
      </div>
    );
  }

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Layout':
        return <Layout className="h-12 w-12 text-blue-500" />;
      case 'Server':
        return <Server className="h-12 w-12 text-purple-500" />;
      case 'Layers':
        return <Layers className="h-12 w-12 text-teal-500" />;
      case 'Smartphone':
        return <Smartphone className="h-12 w-12 text-green-500" />;
      case 'GitMerge':
        return <GitMerge className="h-12 w-12 text-red-500" />;
      case 'BarChart':
        return <BarChart className="h-12 w-12 text-yellow-500" />;
      case 'Cloud':
        return <Cloud className="h-12 w-12 text-indigo-500" />;
      case 'Shield':
        return <Shield className="h-12 w-12 text-orange-500" />;
      default:
        return <Layout className="h-12 w-12 text-blue-500" />;
    }
  };

  const getDemandBadgeColor = (demand: string) => {
    switch (demand) {
      case 'High':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Low':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link
              to="/career-paths"
              className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-4"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Career Paths
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 p-8 text-white">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-white/10 rounded-lg mr-4">
                  {getIconComponent(careerPath.icon)}
                </div>
                <div>
                  <h1 className="text-3xl font-bold">{careerPath.title}</h1>
                  <div className="flex items-center mt-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getDemandBadgeColor(
                        careerPath.demandLevel
                      )}`}
                    >
                      {careerPath.demandLevel} Demand
                    </span>
                    <span className="ml-3 text-sm font-medium">
                      {careerPath.averageSalary}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-lg opacity-90">{careerPath.description}</p>
            </div>

            {/* Content Section */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Required Skills */}
                <div>
                  <div className="flex items-center mb-4">
                    <Briefcase className="h-5 w-5 text-blue-500 mr-2" />
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Required Skills
                    </h2>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex flex-wrap gap-2">
                      {careerPath.requiredSkills.map((skill, index) => (
                        <span
                          key={index}
                          className="text-sm px-3 py-1 bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full shadow-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Education */}
                <div>
                  <div className="flex items-center mb-4">
                    <Graduation className="h-5 w-5 text-blue-500 mr-2" />
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Education
                    </h2>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <ul className="space-y-2">
                      {careerPath.education.map((item, index) => (
                        <li key={index} className="text-gray-700 dark:text-gray-300 flex items-start">
                          <span className="mr-2">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Job Outlook */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <TrendingUp className="h-5 w-5 text-blue-500 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Job Outlook
                  </h2>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <p className="text-gray-700 dark:text-gray-300">{careerPath.jobOutlook}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Related Roles */}
                <div>
                  <div className="flex items-center mb-4">
                    <Briefcase className="h-5 w-5 text-blue-500 mr-2" />
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Related Roles
                    </h2>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <ul className="space-y-2">
                      {careerPath.relatedRoles.map((role, index) => (
                        <li key={index} className="text-gray-700 dark:text-gray-300 flex items-start">
                          <span className="mr-2">•</span>
                          <span>{role}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Top Companies */}
                <div>
                  <div className="flex items-center mb-4">
                    <Building className="h-5 w-5 text-blue-500 mr-2" />
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Top Companies
                    </h2>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <ul className="space-y-2">
                      {careerPath.companies.map((company, index) => (
                        <li key={index} className="text-gray-700 dark:text-gray-300 flex items-start">
                          <span className="mr-2">•</span>
                          <span>{company}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Learning Path */}
              {relatedRoadmap && (
                <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Start Your Learning Journey
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Ready to pursue this career path? Follow our detailed roadmap to learn all the necessary skills.
                  </p>
                  <Link
                    to={`/roadmaps/${relatedRoadmap.id}`}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                  >
                    View {relatedRoadmap.title} Roadmap
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerPathDetailPage;