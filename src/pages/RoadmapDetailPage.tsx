import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { roadmaps, RoadmapStep } from '../data/roadmapsData';
import { CheckCircle, Circle, ArrowLeft, Book, Video, Monitor, FileText, ExternalLink } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const RoadmapDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  
  const roadmap = roadmaps.find(r => r.id === id);

  if (!roadmap) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors duration-300">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Roadmap not found
          </h1>
          <Link
            to="/roadmaps"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Roadmaps
          </Link>
        </div>
      </div>
    );
  }

  const handleToggleComplete = (stepId: string) => {
    if (!isAuthenticated) return;
    
    setCompletedSteps(prev => {
      if (prev.includes(stepId)) {
        return prev.filter(id => id !== stepId);
      } else {
        return [...prev, stepId];
      }
    });
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <FileText className="h-4 w-4 text-blue-500" />;
      case 'video':
        return <Video className="h-4 w-4 text-red-500" />;
      case 'course':
        return <Monitor className="h-4 w-4 text-purple-500" />;
      case 'book':
        return <Book className="h-4 w-4 text-green-500" />;
      default:
        return <FileText className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link
              to="/roadmaps"
              className="inline-flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 mb-6 font-medium transition-colors duration-200"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Roadmaps
            </Link>
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {roadmap.title} Roadmap
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {roadmap.description}
              </p>
            </div>
          </div>

          {isAuthenticated && (
            <div className="bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 mb-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Your Progress
              </h2>
              <div className="flex items-center">
                <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-500"
                    style={{
                      width: `${(completedSteps.length / roadmap.steps.length) * 100}%`,
                    }}
                  ></div>
                </div>
                <span className="ml-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
                  {completedSteps.length}/{roadmap.steps.length} steps
                </span>
              </div>
            </div>
          )}

          <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <div className="space-y-10">
              {roadmap.steps.map((step: RoadmapStep, index: number) => (
                <div
                  key={step.id}
                  className={`relative ${
                    index < roadmap.steps.length - 1 ? 'pb-10' : ''
                  }`}
                >
                  {index < roadmap.steps.length - 1 && (
                    <div
                      className="absolute left-6 top-14 -ml-px h-full w-0.5 bg-gradient-to-b from-indigo-200 to-purple-200 dark:from-indigo-800 dark:to-purple-800"
                      aria-hidden="true"
                    ></div>
                  )}
                  
                  <div className="relative flex items-start">
                    {isAuthenticated ? (
                      <button
                        onClick={() => handleToggleComplete(step.id)}
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all duration-200 shadow-md hover:shadow-lg"
                        aria-label={completedSteps.includes(step.id) ? "Mark as incomplete" : "Mark as complete"}
                      >
                        {completedSteps.includes(step.id) ? (
                          <CheckCircle className="h-7 w-7 text-indigo-500" />
                        ) : (
                          <Circle className="h-7 w-7 text-gray-400 dark:text-gray-600" />
                        )}
                      </button>
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 border border-indigo-200 dark:border-indigo-700">
                        <span className="text-indigo-600 dark:text-indigo-400 font-bold text-lg">{index + 1}</span>
                      </div>
                    )}
                    
                    <div className="ml-6 flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                        {step.description}
                      </p>
                      
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                        <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
                          Recommended Resources
                        </h4>
                        <ul className="space-y-3">
                          {step.resources.map((resource, resourceIndex) => (
                            <li key={resourceIndex}>
                              <a
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center p-3 text-sm bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-md transition-all duration-200 group"
                              >
                                <span className="mr-3">
                                  {getResourceIcon(resource.type)}
                                </span>
                                <span className="flex-1 font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                                  {resource.title}
                                </span>
                                <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-indigo-500" />
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {!isAuthenticated && (
            <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-8 text-center border border-indigo-200 dark:border-indigo-800">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Track Your Progress
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                Sign in to mark your progress through this roadmap and save your learning journey.
              </p>
              <Link
                to="/login"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Sign In to Continue
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoadmapDetailPage;