import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Leaf, UtensilsCrossed, History, Settings, Apple, X } from 'lucide-react';
import { ingredients, ingredientCategories } from '../data/ingredients';

export default function Ingredients() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [showIngredientDetail, setShowIngredientDetail] = useState<string | null>(null);

  const filteredIngredients = ingredients.filter(ingredient => {
    const matchesSearch = ingredient.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === '全部' || ingredient.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const selectedIngredient = ingredients.find(i => i.id === showIngredientDetail);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <header className="bg-white card-shadow sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-semibold text-gray-800">食材库</h1>
              <p className="text-gray-500 text-sm">发现健康食材</p>
            </div>
            <button
              onClick={() => navigate('/settings')}
              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索食材..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10"
            />
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6">
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
          {ingredientCategories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-button text-sm whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 card-shadow'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          {filteredIngredients.map(ingredient => (
            <div
              key={ingredient.id}
              onClick={() => setShowIngredientDetail(ingredient.id)}
              className="bg-white rounded-card p-3 card-shadow cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="aspect-square rounded-card overflow-hidden mb-2">
                <img
                  src={ingredient.image}
                  alt={ingredient.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-medium text-gray-800 text-sm">{ingredient.name}</h3>
              <p className="text-primary text-sm font-medium">{ingredient.calories} kcal/100g</p>
            </div>
          ))}
        </div>

        {filteredIngredients.length === 0 && (
          <div className="text-center py-12">
            <Apple className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">没有找到匹配的食材</p>
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 card-shadow">
        <div className="max-w-md mx-auto flex items-center justify-around py-3">
          <button
            onClick={() => navigate('/')}
            className="flex flex-col items-center gap-1 text-gray-500 hover:text-primary"
          >
            <Leaf className="w-6 h-6" />
            <span className="text-xs">首页</span>
          </button>
          <button
            onClick={() => navigate('/ingredients')}
            className="flex flex-col items-center gap-1 text-primary"
          >
            <Apple className="w-6 h-6" />
            <span className="text-xs">食材</span>
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

      {showIngredientDetail && selectedIngredient && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50">
          <div className="bg-white rounded-t-2xl w-full max-w-md max-h-[70vh] overflow-y-auto">
            <div className="relative">
              <img
                src={selectedIngredient.image}
                alt={selectedIngredient.name}
                className="w-full h-48 object-cover"
              />
              <button
                onClick={() => setShowIngredientDetail(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-1">{selectedIngredient.name}</h2>
              <p className="text-gray-500 text-sm mb-4">{selectedIngredient.category}</p>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-50 rounded-card p-3">
                  <div className="text-gray-500 text-xs mb-1">热量</div>
                  <div className="text-primary font-semibold">{selectedIngredient.calories} kcal</div>
                </div>
                <div className="bg-gray-50 rounded-card p-3">
                  <div className="text-gray-500 text-xs mb-1">蛋白质</div>
                  <div className="text-accent font-semibold">{selectedIngredient.protein}g</div>
                </div>
                <div className="bg-gray-50 rounded-card p-3">
                  <div className="text-gray-500 text-xs mb-1">碳水</div>
                  <div className="text-secondary font-semibold">{selectedIngredient.carbs}g</div>
                </div>
                <div className="bg-gray-50 rounded-card p-3">
                  <div className="text-gray-500 text-xs mb-1">脂肪</div>
                  <div className="text-gray-700 font-semibold">{selectedIngredient.fat}g</div>
                </div>
              </div>

              <button
                onClick={() => setShowIngredientDetail(null)}
                className="w-full btn-primary"
              >
                知道了
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
