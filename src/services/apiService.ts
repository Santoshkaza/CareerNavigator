const API_BASE_URL = 'http://localhost:5000/api';


class ApiService {
  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  // Authentication
  async login(email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    return data;
  }

  async signup(userData: {
    username: string;
    email: string;
    password: string;
  }) {
    // console.log('Signing up user with data:', userData); // Debugging log
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      console.log("Abhiraj");
      const error = await response.json();
      throw new Error(error.message || 'Signup failed');
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    return data;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // Companies
  async getCompanies(search?: string) {
    const url = new URL(`${API_BASE_URL}/companies`);
    if (search) {
      url.searchParams.append('search', search);
    }

    const response = await fetch(url.toString(), {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch companies');
    }

    return response.json();
  }

  async getCompanyById(id: string) {
    const response = await fetch(`${API_BASE_URL}/companies/${id}`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch company');
    }

    return response.json();
  }

  // Roadmaps
  async getRoadmaps(search?: string) {
    const url = new URL(`${API_BASE_URL}/roadmaps`);
    if (search) {
      url.searchParams.append('search', search);
    }

    const response = await fetch(url.toString(), {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch roadmaps');
    }

    return response.json();
  }

  async getRoadmapById(id: string) {
    const response = await fetch(`${API_BASE_URL}/roadmaps/${id}`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch roadmap');
    }

    return response.json();
  }

  // Career Paths
  async getCareerPaths(search?: string) {
    const url = new URL(`${API_BASE_URL}/career-paths`);
    if (search) {
      url.searchParams.append('search', search);
    }

    const response = await fetch(url.toString(), {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch career paths');
    }

    return response.json();
  }

  async getCareerPathById(id: string) {
    const response = await fetch(`${API_BASE_URL}/career-paths/${id}`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch career path');
    }

    return response.json();
  }

  async createCareerPath(careerPathData: {
    name: string;
    roadmapId: string;
    skills: string;
    education: string;
    jobOutlook: string;
    relatedJobs: string;
  }) {
    const response = await fetch(`${API_BASE_URL}/career-paths`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(careerPathData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create career path');
    }

    return response.json();
  }

  // Progress
  async getUserProgress() {
    const response = await fetch(`${API_BASE_URL}/progress/dashboard`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user progress');
    }

    return response.json();
  }

  async markDSAProblemComplete(problemData: {
    problemId: string;
    difficulty: string;
    timeSpent?: number;
    attempts?: number;
  }) {
    const response = await fetch(`${API_BASE_URL}/progress/dsa/complete`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(problemData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to mark problem as completed');
    }

    return response.json();
  }

  // DSA Problems
  async getDSAProblems(search?: string, category?: string, difficulty?: string) {
    const url = new URL(`${API_BASE_URL}/dsa`);
    if (search) url.searchParams.append('search', search);
    if (category) url.searchParams.append('category', category);
    if (difficulty) url.searchParams.append('difficulty', difficulty);

    const response = await fetch(url.toString(), {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch DSA problems');
    }

    return response.json();
  }

  async getDSAProblemById(id: string) {
    const response = await fetch(`${API_BASE_URL}/dsa/${id}`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch DSA problem');
    }

    return response.json();
  }

  async getDSAProblemsByCategory(categoryId: string) {
    const response = await fetch(`${API_BASE_URL}/dsa/category/${categoryId}`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch DSA problems by category');
    }

    return response.json();
  }

  async getDSACategories() {
    const response = await fetch(`${API_BASE_URL}/dsa/meta/categories`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch DSA categories');
    }

    return response.json();
  }

  async createDSAProblem(problemData: {
    id: string;
    title: string;
    description: string;
    difficulty: 'easy' | 'medium' | 'hard';
    category: string;
    url: string;
    companies: string[];
  }) {
    const response = await fetch(`${API_BASE_URL}/dsa`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(problemData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create DSA problem');
    }

    return response.json();
  }
}

export const apiService = new ApiService();
export default apiService;
