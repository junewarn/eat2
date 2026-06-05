import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Edit3, Bell, BellOff, Shield, HelpCircle, LogOut, Target, Palette, Database, ChevronRight } from 'lucide-react';
import type { User as UserType } from '../types';

interface SettingsItem {
  icon: typeof Bell;
  label: string;
  desc: string;
  action: () => void;
  toggle?: boolean;
  toggleValue?: boolean;
  danger?: boolean;
}

interface SettingsGroup {
  title: string;
  items: SettingsItem[];
}

export default function Settings() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    height: '',
    weight: '',
    age: '',
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('diet_user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setEditForm({
        name: parsedUser.name,
        email: parsedUser.email,
        height: parsedUser.height.toString(),
        weight: parsedUser.weight.toString(),
        age: parsedUser.age.toString(),
      });
    }
  }, []);

  const handleSave = () => {
    if (user) {
      const updatedUser = {
        ...user,
        name: editForm.name,
        email: editForm.email,
        height: parseInt(editForm.height) || user.height,
        weight: parseInt(editForm.weight) || user.weight,
        age: parseInt(editForm.age) || user.age,
      };
      localStorage.setItem('diet_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setEditMode(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('diet_user');
    navigate('/welcome');
  };

  const handleDeleteData = () => {
    localStorage.removeItem('diet_user');
    localStorage.removeItem('diet_records');
    navigate('/welcome');
  };

  const settingsGroups: SettingsGroup[] = [
    {
      title: '目标设置',
      items: [
        { icon: Target, label: '每日目标', desc: '设置热量和营养目标', action: () => {} },
        { icon: Palette, label: '饮食偏好', desc: '管理饮食限制和偏好', action: () => {} },
      ],
    },
    {
      title: '通知设置',
      items: [
        { 
          icon: notificationsEnabled ? Bell : BellOff, 
          label: '推送通知', 
          desc: notificationsEnabled ? '已开启' : '已关闭',
          action: () => setNotificationsEnabled(!notificationsEnabled),
          toggle: true,
          toggleValue: notificationsEnabled,
        },
        { icon: Bell, label: '每日提醒', desc: '设置饮食记录提醒时间', action: () => {} },
      ],
    },
    {
      title: '数据管理',
      items: [
        { icon: Database, label: '导出数据', desc: '导出所有饮食记录', action: () => {} },
        { 
          icon: Database, 
          label: '清除数据', 
          desc: '删除所有本地数据', 
          action: handleDeleteData,
          danger: true,
        },
      ],
    },
    {
      title: '关于',
      items: [
        { icon: Shield, label: '隐私政策', desc: '了解数据使用方式', action: () => {} },
        { icon: HelpCircle, label: '帮助与支持', desc: '获取使用帮助', action: () => {} },
      ],
    },
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white card-shadow">
        <div className="max-w-md mx-auto px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>返回</span>
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-primary" />
            </div>
            <div className="flex-1">
              {editMode ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                    className="input-field text-lg font-semibold"
                  />
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                    className="input-field text-sm"
                  />
                </div>
              ) : (
                <>
                  <h1 className="text-xl font-semibold text-gray-800">{user.name}</h1>
                  <p className="text-gray-500 text-sm">{user.email}</p>
                </>
              )}
            </div>
            <button
              onClick={editMode ? handleSave : () => setEditMode(true)}
              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <Edit3 className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {editMode && (
            <div className="bg-gray-50 rounded-card p-4 mb-6">
              <h3 className="font-medium text-gray-800 mb-3">基本信息</h3>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-gray-500 text-xs mb-1">身高 (cm)</label>
                  <input
                    type="number"
                    value={editForm.height}
                    onChange={(e) => setEditForm(prev => ({ ...prev, height: e.target.value }))}
                    className="input-field text-center"
                  />
                </div>
                <div>
                  <label className="block text-gray-500 text-xs mb-1">体重 (kg)</label>
                  <input
                    type="number"
                    value={editForm.weight}
                    onChange={(e) => setEditForm(prev => ({ ...prev, weight: e.target.value }))}
                    className="input-field text-center"
                  />
                </div>
                <div>
                  <label className="block text-gray-500 text-xs mb-1">年龄</label>
                  <input
                    type="number"
                    value={editForm.age}
                    onChange={(e) => setEditForm(prev => ({ ...prev, age: e.target.value }))}
                    className="input-field text-center"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        {settingsGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="bg-white rounded-card card-shadow">
            <div className="px-4 py-3 border-b border-gray-100">
              <h2 className="font-medium text-gray-700">{group.title}</h2>
            </div>
            <div className="divide-y divide-gray-50">
              {group.items.map((item, itemIndex) => {
                const isDanger = item.danger;
                const hasToggle = item.toggle !== undefined;
                return (
                  <button
                    key={itemIndex}
                    onClick={item.action}
                    className={`w-full px-4 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors ${isDanger ? 'text-red-500' : ''}`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isDanger ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {(() => {
                        const Icon = item.icon;
                        return <Icon className="w-5 h-5" />;
                      })()}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium text-gray-800">{item.label}</div>
                      <div className="text-gray-500 text-sm">{item.desc}</div>
                    </div>
                    {hasToggle ? (
                      <div className={`w-12 h-6 rounded-full transition-colors ${item.toggleValue ? 'bg-primary' : 'bg-gray-300'}`}>
                        <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${item.toggleValue ? 'translate-x-6' : 'translate-x-0.5'}`} />
                      </div>
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        <button
          onClick={handleLogout}
          className="w-full bg-white rounded-card p-4 card-shadow flex items-center justify-center gap-2 text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">退出登录</span>
        </button>

        <p className="text-center text-gray-400 text-xs">
          减脂饮食记录 v1.0.0
        </p>
      </main>
    </div>
  );
}
