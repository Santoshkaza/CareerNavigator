import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { ProgressProvider } from './context/ProgressContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Pages
import CareerPathDetailPage from './pages/CareerPathDetailPage';
import CareerPathsPage from './pages/CareerPathsPage';
import CompaniesPage from './pages/CompaniesPage';
import DashboardPage from './pages/DashboardPage';
import DSASheetsPage from './pages/DSASheetsPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RoadmapDetailPage from './pages/RoadmapDetailPage';
import RoadmapsPage from './pages/RoadmapsPage';
import SignupPage from './pages/SignupPage';

// Component to handle scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when pathname changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return null;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ProgressProvider>
          <Router>
            <ScrollToTop />
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/dsa-sheets" element={<DSASheetsPage />} />
                  <Route path="/roadmaps" element={<RoadmapsPage />} />
                  <Route path="/roadmaps/:id" element={<RoadmapDetailPage />} />
                  <Route path="/companies" element={<CompaniesPage />} />
                  <Route path="/career-paths" element={<CareerPathsPage />} />
                  <Route path="/career-paths/:id" element={<CareerPathDetailPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </ProgressProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;