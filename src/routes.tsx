import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Onboarding from './pages/Onboarding';
import Ingredients from './pages/Ingredients';
import Recipes from './pages/Recipes';
import History from './pages/History';
import Settings from './pages/Settings';

const checkLogin = () => {
  const user = localStorage.getItem('diet_user');
  if (!user) return false;
  const userData = JSON.parse(user);
  // 检查是否有完整个人信息
  return userData.hasProfile === true;
};

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  return checkLogin() ? children : <Navigate to="/" />;
}

function AppRoutes() {
  return (
    <BrowserRouter basename="/eat2">
      <Routes>
        {/* 首页：显示登录/注册/游客登录 */}
        <Route path="/" element={<Home />} />
        
        {/* 个人信息填写 */}
        <Route path="/onboarding/step:step" element={<Onboarding />} />
        
        {/* 受保护的页面 */}
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

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
