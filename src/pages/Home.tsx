import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Camera, Plus, Trash2, Edit3, Leaf, UtensilsCrossed, History, Settings, Sun, Moon, Coffee, Apple, X, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { mockDailyGoals, mockMealRecords } from '../data/mockData';
import { recipes } from '../data/recipes';
import { ingredients } from '../data/ingredients';
import type { MealRecord, MealType, Ingredient } from '../types';

type AuthTab = 'login' | 'register' | 'guest';

const mealConfig: { type: MealType; label: string; icon: typeof Sun; time: string }[] = [
  { type: 'breakfast', label: '早餐', icon: Sun, time: '06:00 - 09:00' },
  { type: 'lunch', label: '午餐', icon: UtensilsCrossed, time: '11:00 - 14:00' },
  { type: 'dinner', label: '晚餐', icon: Moon, time: '17:00 - 20:00' },
  { type: 'snack', label: '加餐', icon: Coffee, time: '随时' },
];

export default function Home() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeAuthTab, setActiveAuthTab] = useState<AuthTab>('login');
  const [authLoading, setAuthLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authFormData, setAuthFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // 检查是否已登录
  useEffect(() => {
    const user = localStorage.getItem('diet_user');
    if (user) {
      const userData = JSON.parse(user);
      // 检查是否有完整个人信息
      if (userData.hasProfile) {
        setIsAuthenticated(true);
      } else {
        // 已登录但未填写个人信息，跳转到onboarding
        navigate('/onboarding/step1');
      }
    }
  }, [navigate]);

  // 已认证后的主页状态
  if (isAuthenticated) {
    return <HomeContent navigate={navigate} />;
  }

  // 未认证时显示登录/注册/游客登录
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Leaf className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-3">减脂饮食记录</h1>
          <p className="text-gray-500">科学管理饮食，健康享受生活</p>
        </div>

        <div className="bg-white rounded-card p-6 card-shadow">
          {/* Tab切换 */}
          <div className="flex mb-6">
            <button
              onClick={() => { setActiveAuthTab('login'); setAuthError(''); }}
              className={`flex-1 py-3 font-medium transition-colors duration-200 ${
                activeAuthTab === 'login'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-500 border-b-2 border-transparent hover:text-gray-700'
              }`}
            >
              登录
            </button>
            <button
              onClick={() => { setActiveAuthTab('register'); setAuthError(''); }}
              className={`flex-1 py-3 font-medium transition-colors duration-200 ${
                activeAuthTab === 'register'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-500 border-b-2 border-transparent hover:text-gray-700'
              }`}
            >
              注册
            </button>
            <button
              onClick={() => { setActiveAuthTab('guest'); setAuthError(''); }}
              className={`flex-1 py-3 font-medium transition-colors duration-200 ${
                activeAuthTab === 'guest'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-500 border-b-2 border-transparent hover:text-gray-700'
              }`}
            >
              游客
            </button>
          </div>

          {/* 登录表单 */}
          {activeAuthTab === 'login' && (
            <form
              onSubmit={(e) => handleAuth(e, 'login', navigate, setAuthError, setAuthLoading, setAuthFormData, setActiveAuthTab, setIsAuthenticated)}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">邮箱</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={authFormData.email}
                    onChange={(e) => setAuthFormData(prev => ({ ...prev, email: e.target.value }))}
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
                    value={authFormData.password}
                    onChange={(e) => setAuthFormData(prev => ({ ...prev, password: e.target.value }))}
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

              {authError && <div className="text-red-500 text-sm">{authError}</div>}

              <button
                type="submit"
                disabled={authLoading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {authLoading ? '处理中...' : '登录'}
              </button>
            </form>
          )}

          {/* 注册表单 */}
          {activeAuthTab === 'register' && (
            <form
              onSubmit={(e) => handleAuth(e, 'register', navigate, setAuthError, setAuthLoading, setAuthFormData, setActiveAuthTab, setIsAuthenticated)}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">用户名</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={authFormData.name}
                    onChange={(e) => setAuthFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="请输入用户名"
                    className="input-field pl-12"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">邮箱</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={authFormData.email}
                    onChange={(e) => setAuthFormData(prev => ({ ...prev, email: e.target.value }))}
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
                    value={authFormData.password}
                    onChange={(e) => setAuthFormData(prev => ({ ...prev, password: e.target.value }))}
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

              {authError && <div className="text-red-500 text-sm">{authError}</div>}

              <button
                type="submit"
                disabled={authLoading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {authLoading ? '处理中...' : '注册'}
              </button>

              <p className="text-center text-gray-500 text-sm">
                已有账号？{' '}
                <button
                  onClick={() => setActiveAuthTab('login')}
                  className="text-primary hover:text-primary/80"
                >
                  立即登录
                </button>
              </p>
            </form>
          )}

          {/* 游客登录 */}
          {activeAuthTab === 'guest' && (
            <div className="space-y-4">
              <div className="text-center text-gray-600 mb-6">
                <p>游客模式仅保存在本地浏览器中</p>
                <p className="text-sm text-gray-400 mt-2">无需注册，即可开始记录饮食</p>
              </div>

              <button
                onClick={() => handleGuestLogin(navigate, setIsAuthenticated)}
                className="w-full bg-white border-2 border-gray-200 text-gray-600 px-6 py-4 rounded-card font-medium flex items-center justify-center gap-3 hover:bg-gray-50 hover:border-gray-300 transition-colors duration-200"
              >
                <User className="w-5 h-5" />
                <span>以游客身份开始</span>
              </button>
            </div>
          )}
        </div>

        <p className="text-center text-gray-400 text-sm mt-6">
          登录后需完善个人信息以便为您提供个性化服务
        </p>
      </div>
    </div>
  );
}

// 登录/注册处理函数
function handleAuth(
  e: React.FormEvent,
  type: 'login' | 'register',
  navigate: (path: string) => void,
  setAuthError: (error: string) => void,
  setAuthLoading: (loading: boolean) => void,
  setAuthFormData: (data: { name: string; email: string; password: string }) => void,
  setActiveAuthTab: (tab: AuthTab) => void,
  setIsAuthenticated: (auth: boolean) => void
) {
  e.preventDefault();
  setAuthError('');
  setAuthLoading(true);

  const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

  const endpoint = type === 'login' ? '/api/auth/login' : '/api/auth/register';
  fetch(`${apiUrl}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: authFormData.email,
      password: authFormData.password,
      username: authFormData.name,
    }),
  })
    .then(res => res.json())
    .then(data => {
      if (!data || !data.user) {
        throw new Error(data.error || (type === 'login' ? '登录失败' : '注册失败'));
      }

      const userData = {
        id: data.user.id.toString(),
        name: data.user.username || authFormData.name,
        email: data.user.email,
        isGuest: false,
        height: 0,
        weight: 0,
        age: 0,
        gender: 'male' as const,
        activityLevel: 'moderate' as const,
        goal: 'lose' as const,
        targetWeight: 65,
        dietaryPreferences: [],
        hasProfile: false,
        token: data.token,
      };

      localStorage.setItem('diet_user', JSON.stringify(userData));
      setIsAuthenticated(true);
      navigate('/onboarding/step1');
    })
    .catch(err => {
      setAuthError(err instanceof Error ? err.message : '发生错误');
    })
    .finally(() => {
      setAuthLoading(false);
    });
}

// 游客登录
function handleGuestLogin(navigate: (path: string) => void, setIsAuthenticated: (auth: boolean) => void) {
  localStorage.setItem('diet_user', JSON.stringify({
    id: 'guest_user',
    name: '访客用户',
    email: 'guest@example.com',
    isGuest: true,
    height: 0,
    weight: 0,
    age: 0,
    gender: 'male',
    activityLevel: 'moderate',
    goal: 'lose',
    targetWeight: 65,
    dietaryPreferences: [],
    hasProfile: false,
  }));
  setIsAuthenticated(true);
  navigate('/onboarding/step1');
}

// 主页内容组件
function HomeContent({ navigate }: { navigate: (path: string) => void }) {
  const [records, setRecords] = useState<MealRecord[]>(mockMealRecords);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState<MealType>('breakfast');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<Ingredient | null>(null);
  const [quantity, setQuantity] = useState('100');
  const [unit, setUnit] = useState('克');
  const [ingredientSearch, setIngredientSearch] = useState('');
  const [showAIModal, setShowAIModal] = useState(false);

  const today = new Date();
  const dateStr = `${today.getMonth() + 1}月${today.getDate()}日`;
  const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  const weekDay = weekDays[today.getDay()];

  const dailyStats = records.reduce(
    (acc, record) => ({
      calories: acc.calories + record.calories,
      protein: acc.protein + record.protein,
      carbs: acc.carbs + record.carbs,
      fat: acc.fat + record.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const getProgress = (current: number, goal: number) => Math.min((current / goal) * 100, 100);

  const filteredIngredients = ingredients.filter(
    i => i.name.toLowerCase().includes(ingredientSearch.toLowerCase()) ||
         i.category.toLowerCase().includes(ingredientSearch.toLowerCase())
  );

  const getStandardWeight = (item: Ingredient, qty: number, unit: string): number => {
    const unitConversions: Record<string, number> = {
      '克': 1,
      '份': 100,
      '碗': 150,
      '毫升': 1,
    };
    
    const itemDefaults: Record<string, number> = {
      '鸡蛋': 50,
      '鸭蛋': 70,
      '苹果': 180,
      '香蕉': 100,
      '橙子': 150,
    };

    if (unit === '个') {
      return itemDefaults[item.name] || 100;
    }
    
    return qty * (unitConversions[unit] || 1);
  };

  const calculatedWeight = selectedItem ? getStandardWeight(selectedItem, parseFloat(quantity) || 1, unit) : 0;

  const calculatedNutrients = selectedItem ? {
    calories: ((selectedItem.calories * calculatedWeight) / 100).toFixed(1),
    protein: ((selectedItem.protein * calculatedWeight) / 100).toFixed(1),
    carbs: ((selectedItem.carbs * calculatedWeight) / 100).toFixed(1),
    fat: ((selectedItem.fat * calculatedWeight) / 100).toFixed(1),
  } : { calories: '0', protein: '0', carbs: '0', fat: '0' };

  const handleAddRecord = () => {
    if (!selectedItem) return;
    
    const record: MealRecord = {
      id: Date.now().toString(),
      userId: 'guest_user',
      mealType: selectedMealType,
      foodName: selectedItem.name,
      calories: parseFloat(calculatedNutrients.calories) || 0,
      protein: parseFloat(calculatedNutrients.protein) || 0,
      carbs: parseFloat(calculatedNutrients.carbs) || 0,
      fat: parseFloat(calculatedNutrients.fat) || 0,
      quantity: parseFloat(quantity) || 100,
      unit: unit,
      date: today.toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
    };
    setRecords([...records, record]);
    setShowAddModal(false);
    setSelectedItem(null);
    setQuantity('100');
    setUnit('克');
    setIngredientSearch('');
  };

  const handleDeleteRecord = (id: string) => {
    setRecords(records.filter(r => r.id !== id));
  };

  const filteredRecipes = recipes.filter(
    r => r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
         r.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getMealRecords = (type: MealType) => records.filter(r => r.mealType === type);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <header className="bg-white card-shadow sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-semibold text-gray-800">今日饮食</h1>
              <p className="text-gray-500 text-sm">{dateStr} {weekDay}</p>
            </div>
            <button
              onClick={() => navigate('/settings')}
              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div className="bg-gradient-to-r from-primary to-green-400 rounded-card p-4 text-white">
            <div className="flex items-center justify-between mb-3">
              <span className="text-white/80">今日摄入</span>
              <span className="font-semibold">{dailyStats.calories} / {mockDailyGoals.calories} kcal</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-500"
                style={{ width: `${getProgress(dailyStats.calories, mockDailyGoals.calories)}%` }}
              />
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <div className="text-sm text-white/80">蛋白质</div>
                <div className="font-semibold">{dailyStats.protein.toFixed(1)}g</div>
              </div>
              <div>
                <div className="text-sm text-white/80">碳水</div>
                <div className="font-semibold">{dailyStats.carbs.toFixed(1)}g</div>
              </div>
              <div>
                <div className="text-sm text-white/80">脂肪</div>
                <div className="font-semibold">{dailyStats.fat.toFixed(1)}g</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">餐食记录</h2>
          <div className="space-y-4">
            {mealConfig.map(({ type, label, icon: Icon, time }) => (
              <div key={type} className="bg-white rounded-card p-4 card-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">{label}</h3>
                      <p className="text-gray-400 text-xs">{time}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedMealType(type);
                      setShowAddModal(true);
                    }}
                    className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-2">
                  {getMealRecords(type).length === 0 ? (
                    <p className="text-gray-400 text-sm text-center py-4">暂无记录</p>
                  ) : (
                    getMealRecords(type).map(record => (
                      <div key={record.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-card">
                        <div className="flex-1">
                          <div className="font-medium text-gray-800">{record.foodName}</div>
                          <div className="text-gray-500 text-xs">
                            {record.calories} kcal · {record.quantity}{record.unit}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <button className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600">
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteRecord(record.id)}
                            className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">智能推荐</h2>
            <button
              onClick={() => navigate('/recipes')}
              className="text-primary text-sm hover:text-primary/80"
            >
              查看全部
            </button>
          </div>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索菜谱..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10"
            />
          </div>

          <div className="space-y-3">
            {filteredRecipes.slice(0, 3).map(recipe => (
              <div key={recipe.id} className="bg-white rounded-card p-3 card-shadow flex gap-3">
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-16 h-16 rounded-card object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">{recipe.name}</h3>
                  <p className="text-gray-500 text-xs mb-1">{recipe.description}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-primary text-sm font-medium">{recipe.calories} kcal</span>
                    <span className="text-gray-400 text-xs">·</span>
                    <span className="text-gray-500 text-xs">{recipe.prepTime}分钟</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 card-shadow">
        <div className="max-w-md mx-auto flex items-center justify-around py-3">
          <button
            onClick={() => navigate('/')}
            className="flex flex-col items-center gap-1 text-primary"
          >
            <Leaf className="w-6 h-6" />
            <span className="text-xs">首页</span>
          </button>
          <button
            onClick={() => navigate('/ingredients')}
            className="flex flex-col items-center gap-1 text-gray-500 hover:text-primary"
          >
            <Apple className="w-6 h-6" />
            <span className="text-xs">食材</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-white shadow-lg hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-7 h-7" />
          </button>
          <button
            onClick={() => navigate('/recipes')}
            className="flex flex-col items-center gap-1 text-gray-500 hover:text-primary"
          >
            <UtensilsCrossed className="w-6 h-6" />
            <span className="text-xs">菜谱</span>
          </button>
          <button
            onClick={() => navigate('/history')}
            className="flex flex-col items-center gap-1 text-gray-500 hover:text-primary"
          >
            <History className="w-6 h-6" />
            <span className="text-xs">历史</span>
          </button>
        </div>
      </nav>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-card w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">添加饮食记录</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">选择餐次</label>
                <div className="grid grid-cols-4 gap-2">
                  {mealConfig.map(({ type, label }) => (
                    <button
                      key={type}
                      onClick={() => setSelectedMealType(type)}
                      className={`py-2 rounded-card text-sm transition-colors ${
                        selectedMealType === type
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">搜索食材</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={ingredientSearch}
                    onChange={(e) => setIngredientSearch(e.target.value)}
                    placeholder="输入食材名称搜索..."
                    className="input-field pl-10"
                  />
                </div>
              </div>

              <div className="max-h-48 overflow-y-auto bg-gray-50 rounded-card p-2">
                {filteredIngredients.length === 0 ? (
                  <p className="text-gray-400 text-sm text-center py-4">未找到食材</p>
                ) : (
                  filteredIngredients.map(ingredient => (
                    <button
                      key={ingredient.id}
                      onClick={() => setSelectedItem(ingredient)}
                      className={`w-full flex items-center gap-3 p-3 rounded-card transition-colors ${
                        selectedItem?.id === ingredient.id
                          ? 'bg-primary/10 border border-primary'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <img
                        src={ingredient.image}
                        alt={ingredient.name}
                        className="w-12 h-12 rounded-card object-cover"
                      />
                      <div className="flex-1 text-left">
                        <div className="font-medium text-gray-800">{ingredient.name}</div>
                        <div className="text-gray-500 text-xs">
                          {ingredient.calories} kcal/100g · {ingredient.category}
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>

              {selectedItem && (
                <>
                  <div className="bg-primary/5 rounded-card p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-700">已选食材</span>
                      <button
                        onClick={() => setSelectedItem(null)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <img
                        src={selectedItem.image}
                        alt={selectedItem.name}
                        className="w-16 h-16 rounded-card object-cover"
                      />
                      <div>
                        <div className="font-medium text-gray-800">{selectedItem.name}</div>
                        <div className="text-gray-500 text-sm">每100g: {selectedItem.calories} kcal</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">份量</label>
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="input-field"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">单位</label>
                      <select
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                        className="input-field"
                      >
                        <option value="克">克</option>
                        <option value="份">份</option>
                        <option value="个">个</option>
                        <option value="碗">碗</option>
                        <option value="毫升">毫升</option>
                      </select>
                    </div>
                  </div>

                  <div className="bg-primary/5 rounded-card p-3">
                    <div className="flex items-center justify-center gap-2 text-sm">
                      <span className="text-gray-600">{quantity}{unit} = </span>
                      <span className="text-primary font-semibold">{calculatedWeight}克</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-card p-4">
                    <div className="text-sm font-medium text-gray-700 mb-3">营养成分 ({calculatedWeight}克)</div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex justify-between">
                        <span className="text-gray-500 text-sm">热量</span>
                        <span className="font-medium text-gray-800">{calculatedNutrients.calories} kcal</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 text-sm">蛋白质</span>
                        <span className="font-medium text-gray-800">{calculatedNutrients.protein} g</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 text-sm">碳水</span>
                        <span className="font-medium text-gray-800">{calculatedNutrients.carbs} g</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 text-sm">脂肪</span>
                        <span className="font-medium text-gray-800">{calculatedNutrients.fat} g</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 btn-secondary"
                >
                  取消
                </button>
                <button
                  onClick={handleAddRecord}
                  disabled={!selectedItem}
                  className={`flex-1 btn-primary ${!selectedItem ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  添加
                </button>
              </div>

              <button 
                onClick={() => setShowAIModal(true)}
                className="w-full py-3 border-2 border-dashed border-gray-200 rounded-card flex items-center justify-center gap-2 text-gray-500 hover:border-primary hover:text-primary transition-colors"
              >
                <Camera className="w-5 h-5" />
                AI拍照识别（模拟）
              </button>
            </div>
          </div>
        </div>
      )}

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-card w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">AI拍照识别</h3>
              <button
                onClick={() => setShowAIModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              <div className="w-full h-48 bg-gray-100 rounded-card flex items-center justify-center mb-4">
                <div className="text-center">
                  <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">点击上传图片</p>
                </div>
              </div>

              <div className="bg-primary/5 rounded-card p-4 mb-4">
                <div className="text-sm font-medium text-gray-700 mb-2">识别结果（模拟）</div>
                <div className="space-y-2">
                  {['鸡胸肉 80%', '西兰花 15%', '米饭 5%'].map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-gray-700">{item}</span>
                      <button className="text-primary text-sm hover:text-primary/80">编辑</button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-card p-4 mb-4">
                <div className="text-sm font-medium text-gray-700 mb-2">营养成分</div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500 text-sm">热量</span>
                    <span className="font-medium text-gray-800">285 kcal</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 text-sm">蛋白质</span>
                    <span className="font-medium text-gray-800">25 g</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 text-sm">碳水</span>
                    <span className="font-medium text-gray-800">20 g</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 text-sm">脂肪</span>
                    <span className="font-medium text-gray-800">10 g</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowAIModal(false)}
                  className="flex-1 btn-secondary"
                >
                  取消
                </button>
                <button
                  onClick={() => {
                    const record: MealRecord = {
                      id: Date.now().toString(),
                      userId: 'guest_user',
                      mealType: selectedMealType,
                      foodName: 'AI识别食物',
                      calories: 285,
                      protein: 25,
                      carbs: 20,
                      fat: 10,
                      quantity: 1,
                      unit: '份',
                      date: today.toISOString().split('T')[0],
                      createdAt: new Date().toISOString(),
                    };
                    setRecords([...records, record]);
                    setShowAIModal(false);
                    setShowAddModal(false);
                  }}
                  className="flex-1 btn-primary"
                >
                  添加到记录
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
