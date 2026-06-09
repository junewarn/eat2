import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Auth from './pages/Auth';
import Onboarding from './pages/Onboarding';
import Home from './pages/Home';
import Ingredients from './pages/Ingredients';
import Recipes from './pages/Recipes';
import History from './pages/History';
import Settings from './pages/Settings';

const checkLogin = () => {
  return !!localStorage.getItem('diet_user');
};

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  return checkLogin() ? children : <Navigate to="/welcome" />;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  return checkLogin() ? <Navigate to="/" /> : children;
}

function AppRoutes() {
  return (
    <BrowserRouter basename="/eat2">
      <Routes>
        <Route 
          path="/welcome" 
          element={<PublicRoute><Welcome /></PublicRoute>} 
        />
        <Route 
          path="/auth" 
          element={<PublicRoute><Auth /></PublicRoute>} 
        />
        <Route path="/onboarding/step:step" element={<Onboarding />} />
        
        <Route 
          path="/" 
          element={<ProtectedRoute><Home /></ProtectedRoute>} 
        />
        <Route 
          path="/ingredients" 
          element={<ProtectedRoute><Ingredients /></ProtectedRoute>} 
        />
        <Route 
          path="/recipes" 
          element={<ProtectedRoute><Recipes /></ProtectedRoute>} 
        />
        <Route 
          path="/history" 
          element={<ProtectedRoute><History /></ProtectedRoute>} 
        />
        <Route 
          path="/settings" 
          element={<ProtectedRoute><Settings /></ProtectedRoute>} 
        />

        <Route path="*" element={<Navigate to={checkLogin() ? "/" : "/welcome"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
