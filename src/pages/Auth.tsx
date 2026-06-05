import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

type TabType = 'login' | 'register';

export default function Auth() {
  const [activeTab, setActiveTab] = useState<TabType>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const userData = {
      id: 'user_' + Date.now(),
      name: activeTab === 'register' ? formData.name : formData.email.split('@')[0],
      email: formData.email,
      isGuest: false,
      height: 175,
      weight: 70,
      age: 28,
      gender: 'male',
      activityLevel: 'moderate',
      goal: 'lose',
      targetWeight: 65,
      dietaryPreferences: [],
    };
    
    localStorage.setItem('diet_user', JSON.stringify(userData));
    navigate('/');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <button
          onClick={() => navigate('/welcome')}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>返回</span>
        </button>

        <div className="bg-white rounded-card p-6 card-shadow">
          <div className="flex mb-6">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-3 font-medium transition-colors duration-200 ${
                activeTab === 'login' 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-gray-500 border-b-2 border-transparent hover:text-gray-700'
              }`}
            >
              登录
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-3 font-medium transition-colors duration-200 ${
                activeTab === 'register' 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-gray-500 border-b-2 border-transparent hover:text-gray-700'
              }`}
            >
              注册
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {activeTab === 'register' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">用户名</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="请输入用户名"
                    className="input-field pl-12"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">邮箱</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="请输入邮箱"
                  className="input-field pl-12"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">密码</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="请输入密码"
                  className="input-field pl-12 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full btn-primary mt-6"
            >
              {activeTab === 'login' ? '登录' : '注册'}
            </button>
          </form>

          {activeTab === 'login' && (
            <p className="text-center text-gray-500 text-sm mt-4">
              还没有账号？{' '}
              <button
                onClick={() => setActiveTab('register')}
                className="text-primary hover:text-primary/80"
              >
                立即注册
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
