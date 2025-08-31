import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

type ResourceCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
  tags?: string[];
  difficulty?: 'easy' | 'medium' | 'hard';
};

const ResourceCard: React.FC<ResourceCardProps> = ({
  title,
  description,
  icon,
  to,
  tags,
  difficulty,
}) => {
  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'hard':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return '';
    }
  };

  return (
    <Link
      to={to}
      className="block bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-200 dark:border-gray-700 hover-glow card-hover-border"
    >
      <div className="p-5">
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-4 text-blue-600 dark:text-blue-400">
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              {title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {description}
            </p>
            <div className="flex flex-wrap items-center mt-2">
              {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {difficulty && (
                <span
                  className={`text-xs px-2 py-1 rounded-full ml-auto ${getDifficultyColor()}`}
                >
                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </span>
              )}
            </div>
          </div>
          <div className="flex-shrink-0 ml-2 self-center">
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ResourceCard;