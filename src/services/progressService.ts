const API_BASE_URL = 'http://localhost:5000/api';

class ProgressService {
  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  // Get complete dashboard data
  async getDashboardData() {
    const response = await fetch(`${API_BASE_URL}/progress/dashboard`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch dashboard data');
    }

    return response.json();
  }

  // Mark DSA problem as completed
  async completeDSAProblem(problemData: {
    problemId: string;
    difficulty: 'EASY' | 'MEDIUM' | 'HARD';
    timeSpent?: number;
    attempts?: number;
  }) {
    const response = await fetch(`${API_BASE_URL}/progress/dsa/complete`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(problemData),
    });

    if (!response.ok) {
      throw new Error('Failed to mark problem as completed');
    }

    return response.json();
  }

  // Update roadmap progress
  async updateRoadmapProgress(roadmapData: {
    roadmapId: string;
    roadmapTitle: string;
    topicId?: string;
    topicTitle?: string;
    progressPercentage?: number;
  }) {
    const response = await fetch(`${API_BASE_URL}/progress/roadmap/update`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(roadmapData),
    });

    if (!response.ok) {
      throw new Error('Failed to update roadmap progress');
    }

    return response.json();
  }

  // Add new goal
  async addGoal(goalData: {
    title: string;
    description: string;
    targetDate: string;
    category: 'DSA' | 'ROADMAP' | 'CAREER' | 'CUSTOM';
    targetValue: number;
  }) {
    const response = await fetch(`${API_BASE_URL}/progress/goals`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(goalData),
    });

    if (!response.ok) {
      throw new Error('Failed to add goal');
    }

    return response.json();
  }

  // Update goal progress
  async updateGoal(goalId: string, updates: {
    currentValue?: number;
    isCompleted?: boolean;
  }) {
    const response = await fetch(`${API_BASE_URL}/progress/goals/${goalId}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      throw new Error('Failed to update goal');
    }

    return response.json();
  }

  // Get weekly report
  async getWeeklyReport() {
    const response = await fetch(`${API_BASE_URL}/progress/report/weekly`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch weekly report');
    }

    return response.json();
  }
}

export const progressService = new ProgressService();
export default progressService;
