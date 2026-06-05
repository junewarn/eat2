import type { Ingredient } from '../types';

export const ingredients: Ingredient[] = [
  { id: '1', name: '鸡胸肉', category: '肉类', calories: 165, protein: 31, carbs: 0, fat: 3.6, image: 'https://picsum.photos/seed/chicken/200/200' },
  { id: '2', name: '西兰花', category: '蔬菜', calories: 34, protein: 2.8, carbs: 7, fat: 0.4, image: 'https://picsum.photos/seed/broccoli/200/200' },
  { id: '3', name: '燕麦', category: '谷物', calories: 389, protein: 17, carbs: 66, fat: 7, image: 'https://picsum.photos/seed/oatmeal/200/200' },
  { id: '4', name: '鸡蛋', category: '蛋类', calories: 143, protein: 13, carbs: 1, fat: 10, image: 'https://picsum.photos/seed/eggs/200/200' },
  { id: '5', name: '三文鱼', category: '海鲜', calories: 208, protein: 20, carbs: 0, fat: 14, image: 'https://picsum.photos/seed/salmon/200/200' },
  { id: '6', name: '糙米', category: '谷物', calories: 348, protein: 7, carbs: 78, fat: 2, image: 'https://picsum.photos/seed/brownrice/200/200' },
  { id: '7', name: '菠菜', category: '蔬菜', calories: 23, protein: 2.9, carbs: 4, fat: 0.4, image: 'https://picsum.photos/seed/spinach/200/200' },
  { id: '8', name: '豆腐', category: '豆制品', calories: 70, protein: 8, carbs: 2, fat: 4, image: 'https://picsum.photos/seed/tofu/200/200' },
  { id: '9', name: '杏仁', category: '坚果', calories: 575, protein: 20, carbs: 20, fat: 49, image: 'https://picsum.photos/seed/almonds/200/200' },
  { id: '10', name: '香蕉', category: '水果', calories: 91, protein: 1, carbs: 23, fat: 0.3, image: 'https://picsum.photos/seed/banana/200/200' },
  { id: '11', name: '苹果', category: '水果', calories: 52, protein: 0.3, carbs: 14, fat: 0.2, image: 'https://picsum.photos/seed/apple/200/200' },
  { id: '12', name: '牛油果', category: '水果', calories: 160, protein: 2, carbs: 9, fat: 15, image: 'https://picsum.photos/seed/avocado/200/200' },
  { id: '13', name: '希腊酸奶', category: '乳制品', calories: 59, protein: 10, carbs: 3, fat: 0.5, image: 'https://picsum.photos/seed/yogurt/200/200' },
  { id: '14', name: '红薯', category: '根茎类', calories: 86, protein: 1.6, carbs: 20, fat: 0.1, image: 'https://picsum.photos/seed/sweetpotato/200/200' },
  { id: '15', name: '牛肉', category: '肉类', calories: 250, protein: 26, carbs: 0, fat: 17, image: 'https://picsum.photos/seed/beef/200/200' },
  { id: '16', name: '虾', category: '海鲜', calories: 85, protein: 20, carbs: 0, fat: 0.5, image: 'https://picsum.photos/seed/shrimp/200/200' },
];

export const ingredientCategories = ['全部', '肉类', '海鲜', '蔬菜', '水果', '谷物', '蛋类', '乳制品', '豆制品', '坚果', '根茎类'];
