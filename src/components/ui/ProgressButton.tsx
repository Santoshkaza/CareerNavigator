import React from 'react';
import { progressService } from '../../services/progressService';
import { CheckCircle, Clock, Zap } from 'lucide-react';

interface ProgressButtonProps {
  problemId: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  isCompleted?: boolean;
  onCompleted?: () => void;
}

export const ProgressButton: React.FC<ProgressButtonProps> = ({ 
  problemId, 
  difficulty, 
  isCompleted, 
  onCompleted 
}) => {
  const [completing, setCompleting] = React.useState(false);
  const [timeSpent, setTimeSpent] = React.useState(30);

  const handleMarkCompleted = async () => {
    if (completing || isCompleted) return;
    
    setCompleting(true);
    try {
      await progressService.completeDSAProblem({
        problemId,
        difficulty,
        timeSpent,
        attempts: 1
      });
      onCompleted?.();
    } catch (error) {
      console.error('Error marking problem as completed:', error);
    } finally {
      setCompleting(false);
    }
  };

  if (isCompleted) {
    return (
      <div className="flex items-center text-green-600">
        <CheckCircle className="h-5 w-5 mr-2" />
        <span className="text-sm font-medium">Completed</span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center space-x-1">
        <Clock className="h-4 w-4 text-gray-400" />
        <input
          type="number"
          value={timeSpent}
          onChange={(e) => setTimeSpent(parseInt(e.target.value) || 30)}
          className="w-16 px-2 py-1 text-xs border border-gray-300 rounded"
          min="1"
          max="300"
        />
        <span className="text-xs text-gray-500">min</span>
      </div>
      <button
        onClick={handleMarkCompleted}
        disabled={completing}
        className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
      >
        {completing ? (
          <>
            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
            Saving...
          </>
        ) : (
          <>
            <Zap className="h-3 w-3 mr-1" />
            Mark Done
          </>
        )}
      </button>
    </div>
  );
};

interface RoadmapProgressButtonProps {
  roadmapId: string;
  roadmapTitle: string;
  topicId: string;
  topicTitle: string;
  isCompleted?: boolean;
  onCompleted?: () => void;
}

export const RoadmapProgressButton: React.FC<RoadmapProgressButtonProps> = ({
  roadmapId,
  roadmapTitle,
  topicId,
  topicTitle,
  isCompleted,
  onCompleted
}) => {
  const [completing, setCompleting] = React.useState(false);

  const handleMarkCompleted = async () => {
    if (completing || isCompleted) return;
    
    setCompleting(true);
    try {
      await progressService.updateRoadmapProgress({
        roadmapId,
        roadmapTitle,
        topicId,
        topicTitle
      });
      onCompleted?.();
    } catch (error) {
      console.error('Error updating roadmap progress:', error);
    } finally {
      setCompleting(false);
    }
  };

  if (isCompleted) {
    return (
      <div className="flex items-center text-green-600">
        <CheckCircle className="h-4 w-4 mr-1" />
        <span className="text-xs font-medium">Completed</span>
      </div>
    );
  }

  return (
    <button
      onClick={handleMarkCompleted}
      disabled={completing}
      className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 disabled:opacity-50"
    >
      {completing ? (
        <>
          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-indigo-600 mr-1"></div>
          Marking...
        </>
      ) : (
        'Mark Complete'
      )}
    </button>
  );
};
