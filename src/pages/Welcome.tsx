import { useNavigate } from 'react-router-dom';
import { Leaf, User, LogIn } from 'lucide-react';

export default function Welcome() {
  const navigate = useNavigate();

  const handleGuestLogin = () => {
    localStorage.setItem('diet_user', JSON.stringify({
      id: 'guest_user',
      name: '访客用户',
      email: 'guest@example.com',
      isGuest: true,
      height: 175,
      weight: 70,
      age: 28,
      gender: 'male',
      activityLevel: 'moderate',
      goal: 'lose',
      targetWeight: 65,
      dietaryPreferences: [],
    }));
    navigate('/');
  };

  const handleAccountLogin = () => {
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Leaf className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-3">减脂饮食记录</h1>
          <p className="text-gray-500">科学管理饮食，健康享受生活</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleGuestLogin}
            className="w-full bg-white border-2 border-primary text-primary px-6 py-4 rounded-card font-medium flex items-center justify-center gap-3 hover:bg-primary/5 transition-colors duration-200"
          >
            <User className="w-5 h-5" />
            <span>访客登录</span>
          </button>
          
          <button
            onClick={handleAccountLogin}
            className="w-full bg-primary text-white px-6 py-4 rounded-card font-medium flex items-center justify-center gap-3 hover:bg-primary/90 transition-colors duration-200"
          >
            <LogIn className="w-5 h-5" />
            <span>账号登录/注册</span>
          </button>
        </div>

        <p className="text-center text-gray-400 text-sm mt-8">
          访客登录数据仅保存在本地浏览器中
        </p>
      </div>
    </div>
  );
}
