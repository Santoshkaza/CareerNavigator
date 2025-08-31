import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

type Progress = {
  completedProblems: string[];
  completedRoadmapSteps: string[];
  savedRoadmaps: string[];
  savedCareerPaths: string[];
};

type ProgressContextType = {
  progress: Progress;
  isLoading: boolean;
  toggleProblemCompletion: (problemId: string) => Promise<void>;
  toggleRoadmapStep: (stepId: string) => Promise<void>;
  toggleSavedRoadmap: (roadmapId: string) => Promise<void>;
  toggleSavedCareerPath: (careerPathId: string) => Promise<void>;
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState<Progress>({
    completedProblems: [],
    completedRoadmapSteps: [],
    savedRoadmaps: [],
    savedCareerPaths: [],
  });

  const loadProgress = useCallback(async () => {
    if (!user) return;

    try {
      const savedProgress = localStorage.getItem('userProgress');
      if (savedProgress) {
        const parsedProgress = JSON.parse(savedProgress);
        setProgress(parsedProgress);
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const saveProgress = useCallback(async (newProgress: Progress) => {
    if (!user) return;

    try {
      localStorage.setItem('userProgress', JSON.stringify(newProgress));
      setProgress(newProgress);
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      setProgress({
        completedProblems: [],
        completedRoadmapSteps: [],
        savedRoadmaps: [],
        savedCareerPaths: [],
      });
      setIsLoading(false);
      return;
    }

    loadProgress();
  }, [user, loadProgress]);

  const toggleProblemCompletion = async (problemId: string) => {
    const newCompletedProblems = progress.completedProblems.includes(problemId)
      ? progress.completedProblems.filter(id => id !== problemId)
      : [...progress.completedProblems, problemId];

    const newProgress = { ...progress, completedProblems: newCompletedProblems };
    await saveProgress(newProgress);
  };

  const toggleRoadmapStep = async (stepId: string) => {
    const newCompletedSteps = progress.completedRoadmapSteps.includes(stepId)
      ? progress.completedRoadmapSteps.filter(id => id !== stepId)
      : [...progress.completedRoadmapSteps, stepId];

    const newProgress = { ...progress, completedRoadmapSteps: newCompletedSteps };
    await saveProgress(newProgress);
  };

  const toggleSavedRoadmap = async (roadmapId: string) => {
    const newSavedRoadmaps = progress.savedRoadmaps.includes(roadmapId)
      ? progress.savedRoadmaps.filter(id => id !== roadmapId)
      : [...progress.savedRoadmaps, roadmapId];

    const newProgress = { ...progress, savedRoadmaps: newSavedRoadmaps };
    await saveProgress(newProgress);
  };

  const toggleSavedCareerPath = async (careerPathId: string) => {
    const newSavedCareerPaths = progress.savedCareerPaths.includes(careerPathId)
      ? progress.savedCareerPaths.filter(id => id !== careerPathId)
      : [...progress.savedCareerPaths, careerPathId];

    const newProgress = { ...progress, savedCareerPaths: newSavedCareerPaths };
    await saveProgress(newProgress);
  };

  return (
    <ProgressContext.Provider
      value={{
        progress,
        isLoading,
        toggleProblemCompletion,
        toggleRoadmapStep,
        toggleSavedRoadmap,
        toggleSavedCareerPath,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = (): ProgressContextType => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};