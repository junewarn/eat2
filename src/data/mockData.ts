import type { MealRecord, DailyStats, User } from '../types';

export const mockUser: User = {
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
};

export const mockDailyGoals = {
  calories: 1500,
  protein: 120,
  carbs: 150,
  fat: 50,
};

export const mockMealRecords: MealRecord[] = [
  {
    id: '1',
    userId: 'guest_user',
    mealType: 'breakfast',
    foodName: '燕麦粥',
    calories: 300,
    protein: 12,
    carbs: 45,
    fat: 6,
    quantity: 1,
    unit: '碗',
    date: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    userId: 'guest_user',
    mealType: 'breakfast',
    foodName: '水煮蛋',
    calories: 143,
    protein: 13,
    carbs: 1,
    fat: 10,
    quantity: 2,
    unit: '个',
    date: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    userId: 'guest_user',
    mealType: 'lunch',
    foodName: '鸡胸肉沙拉',
    calories: 350,
    protein: 35,
    carbs: 15,
    fat: 15,
    quantity: 1,
    unit: '份',
    date: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    userId: 'guest_user',
    mealType: 'snack',
    foodName: '苹果',
    calories: 52,
    protein: 0.3,
    carbs: 14,
    fat: 0.2,
    quantity: 1,
    unit: '个',
    date: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
  },
];

export const generateWeeklyStats = (): DailyStats[] => {
  const stats: DailyStats[] = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    stats.push({
      date: date.toISOString().split('T')[0],
      calories: Math.floor(1200 + Math.random() * 600),
      protein: Math.floor(80 + Math.random() * 60),
      carbs: Math.floor(100 + Math.random() * 100),
      fat: Math.floor(30 + Math.random() * 40),
    });
  }
  return stats;
};

export const generateMonthlyStats = (): DailyStats[] => {
  const stats: DailyStats[] = [];
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    stats.push({
      date: date.toISOString().split('T')[0],
      calories: Math.floor(1200 + Math.random() * 600),
      protein: Math.floor(80 + Math.random() * 60),
      carbs: Math.floor(100 + Math.random() * 100),
      fat: Math.floor(30 + Math.random() * 40),
    });
  }
  return stats;
};

export const generateYearlyStats = (): { month: string; avgCalories: number }[] => {
  const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
  return months.map(month => ({
    month,
    avgCalories: Math.floor(1400 + Math.random() * 400),
  }));
};
