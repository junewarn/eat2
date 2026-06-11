import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, User, Dumbbell, Settings } from 'lucide-react';
import type { User as UserType } from '../types';

export default function Onboarding() {
  const params = useParams<{ step?: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  
  // 从 URL 路径或 search params 获取 step
  let currentStep = 1;
  if (params.step) {
    currentStep = parseInt(params.step, 10);
  } else {
    // 尝试从路径中提取 step
    const pathParts = location.pathname.split('/');
    const stepIndex = pathParts.indexOf('step');
    if (stepIndex !== -1 && pathParts[stepIndex + 1]) {
      currentStep = parseInt(pathParts[stepIndex + 1], 10);
    }
  }
  
  if (isNaN(currentStep) || currentStep < 1 || currentStep > 3) {
    currentStep = 1;
  }

  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    age: '',
    gender: 'male' as 'male' | 'female',
    activityLevel: 'moderate' as 'sedentary' | 'light' | 'moderate' | 'active',
    goal: 'lose' as 'lose' | 'maintain' | 'gain',
    targetWeight: '',
    dietaryPreferences: [] as string[],
  });

  // 从 localStorage 加载用户已有信息
  useEffect(() => {
    const user = localStorage.getItem('diet_user');
    if (user) {
      const userData = JSON.parse(user);
      // 如果用户已经有部分信息，加载它
      if (userData.height && userData.height !== 0) {
        setFormData(prev => ({ ...prev, height: userData.height.toString() }));
      }
      if (userData.weight && userData.weight !== 0) {
        setFormData(prev => ({ ...prev, weight: userData.weight.toString() }));
      }
      if (userData.age && userData.age !== 0) {
        setFormData(prev => ({ ...prev, age: userData.age.toString() }));
      }
      if (userData.gender) {
        setFormData(prev => ({ ...prev, gender: userData.gender }));
      }
      if (userData.activityLevel) {
        setFormData(prev => ({ ...prev, activityLevel: userData.activityLevel }));
      }
      if (userData.goal) {
        setFormData(prev => ({ ...prev, goal: userData.goal }));
      }
      if (userData.targetWeight && userData.targetWeight !== 0) {
        setFormData(prev => ({ ...prev, targetWeight: userData.targetWeight.toString() }));
      }
      if (userData.dietaryPreferences && userData.dietaryPreferences.length > 0) {
        setFormData(prev => ({ ...prev, dietaryPreferences: userData.dietaryPreferences }));
      }
    }
  }, []);

  const preferences = ['素食', '清真', '无乳糖', '无麸质', '低碳水', '高蛋白'];

  const handleNext = () => {
    if (currentStep < 3) {
      navigate(`/onboarding/step${currentStep + 1}`);
    } else {
      // 获取现有用户信息
      const user = localStorage.getItem('diet_user');
      const existingUserData = user ? JSON.parse(user) : {};

      // 更新用户信息，保留 id、token 等其他字段
      const updatedUserData = {
        ...existingUserData,
        height: parseInt(formData.height) || 175,
        weight: parseInt(formData.weight) || 70,
        age: parseInt(formData.age) || 28,
        gender: formData.gender,
        activityLevel: formData.activityLevel,
        goal: formData.goal,
        targetWeight: parseInt(formData.targetWeight) || 65,
        dietaryPreferences: formData.dietaryPreferences,
        hasProfile: true, // 标记已完成个人信息填写
      };

      localStorage.setItem('diet_user', JSON.stringify(updatedUserData));
      navigate('/');
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      navigate(`/onboarding/step${currentStep - 1}`);
    }
  };

  const togglePreference = (pref: string) => {
    setFormData(prev => ({
      ...prev,
      dietaryPreferences: prev.dietaryPreferences.includes(pref)
        ? prev.dietaryPreferences.filter(p => p !== pref)
        : [...prev.dietaryPreferences, pref],
    }));
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">身高 (cm)</label>
        <input
          type="number"
          value={formData.height}
          onChange={(e) => setFormData(prev => ({ ...prev, height: e.target.value }))}
          placeholder="请输入身高"
          className="input-field"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">体重 (kg)</label>
        <input
          type="number"
          value={formData.weight}
          onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
          placeholder="请输入体重"
          className="input-field"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">年龄</label>
        <input
          type="number"
          value={formData.age}
          onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
          placeholder="请输入年龄"
          className="input-field"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">性别</label>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, gender: 'male' }))}
            className={`flex-1 py-3 rounded-card border-2 transition-colors duration-200 ${
              formData.gender === 'male'
                ? 'border-primary bg-primary/5 text-primary'
                : 'border-gray-200 text-gray-500 hover:border-gray-300'
            }`}
          >
            男
          </button>
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, gender: 'female' }))}
            className={`flex-1 py-3 rounded-card border-2 transition-colors duration-200 ${
              formData.gender === 'female'
                ? 'border-primary bg-primary/5 text-primary'
                : 'border-gray-200 text-gray-500 hover:border-gray-300'
            }`}
          >
            女
          </button>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <p className="text-gray-600">请选择您的饮食偏好（可多选）</p>
      <div className="grid grid-cols-2 gap-3">
        {preferences.map(pref => (
          <button
            key={pref}
            type="button"
            onClick={() => togglePreference(pref)}
            className={`py-3 rounded-card border-2 transition-colors duration-200 flex items-center justify-center gap-2 ${
              formData.dietaryPreferences.includes(pref)
                ? 'border-primary bg-primary/5 text-primary'
                : 'border-gray-200 text-gray-700 hover:border-gray-300'
            }`}
          >
            {formData.dietaryPreferences.includes(pref) && <Check className="w-4 h-4" />}
            {pref}
          </button>
        ))}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">健康目标</label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: 'lose', label: '减脂' },
            { value: 'maintain', label: '维持' },
            { value: 'gain', label: '增肌' },
          ].map(item => (
            <button
              key={item.value}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, goal: item.value as 'lose' | 'maintain' | 'gain' }))}
              className={`py-3 rounded-card border-2 transition-colors duration-200 ${
                formData.goal === item.value
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-gray-200 text-gray-500 hover:border-gray-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">活动水平</label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: 'sedentary', label: '久坐' },
            { value: 'light', label: '轻度活动' },
            { value: 'moderate', label: '中度活动' },
            { value: 'active', label: '高度活动' },
          ].map(item => (
            <button
              key={item.value}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, activityLevel: item.value as 'sedentary' | 'light' | 'moderate' | 'active' }))}
              className={`py-3 rounded-card border-2 transition-colors duration-200 ${
                formData.activityLevel === item.value
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-gray-200 text-gray-500 hover:border-gray-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">目标体重 (kg)</label>
        <input
          type="number"
          value={formData.targetWeight}
          onChange={(e) => setFormData(prev => ({ ...prev, targetWeight: e.target.value }))}
          placeholder="请输入目标体重"
          className="input-field"
        />
      </div>
    </div>
  );

  const steps = [
    { icon: User, title: '基本信息', desc: '设置您的身体数据' },
    { icon: Dumbbell, title: '饮食偏好', desc: '选择您的饮食限制' },
    { icon: Settings, title: '智能配置', desc: '设置您的健康目标' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto p-4">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handlePrev}
            disabled={currentStep === 1}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>返回</span>
          </button>
          <div className="flex gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-200 ${
                  index < currentStep
                    ? 'bg-primary text-white'
                    : index === currentStep
                    ? 'bg-primary/20 text-primary'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-card p-6 card-shadow mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              {(() => {
                const Icon = steps[currentStep - 1].icon;
                return <Icon className="w-6 h-6 text-primary" />;
              })()}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {steps[currentStep - 1].title}
              </h2>
              <p className="text-gray-500 text-sm">
                {steps[currentStep - 1].desc}
              </p>
            </div>
          </div>

          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </div>

        <button
          onClick={handleNext}
          className="w-full btn-primary flex items-center justify-center gap-2"
        >
          {currentStep === 3 ? '完成设置' : '下一步'}
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
