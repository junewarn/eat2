import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Leaf, UtensilsCrossed, History, Settings, Apple, Clock, Users, ChefHat, X } from 'lucide-react';
import { recipes, recipeTags, recipeDifficulties } from '../data/recipes';

const difficultyLabels: Record<string, string> = {
  easy: '简单',
  medium: '中等',
  hard: '困难',
};

export default function Recipes() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('全部');
  const [selectedDifficulty, setSelectedDifficulty] = useState('全部');
  const [showRecipeDetail, setShowRecipeDetail] = useState<string | null>(null);

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === '全部' || recipe.tags.includes(selectedTag);
    const matchesDifficulty = selectedDifficulty === '全部' || recipe.difficulty === selectedDifficulty;
    return matchesSearch && matchesTag && matchesDifficulty;
  });

  const selectedRecipe = recipes.find(r => r.id === showRecipeDetail);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <header className="bg-white card-shadow sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-semibold text-gray-800">菜谱库</h1>
              <p className="text-gray-500 text-sm">探索美味食谱</p>
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
              placeholder="搜索菜谱..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10"
            />
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6">
        <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
          {recipeTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-button text-sm whitespace-nowrap transition-colors ${
                selectedTag === tag
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 card-shadow'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
          {recipeDifficulties.map(difficulty => (
            <button
              key={difficulty}
              onClick={() => setSelectedDifficulty(difficulty)}
              className={`px-4 py-2 rounded-button text-sm whitespace-nowrap transition-colors ${
                selectedDifficulty === difficulty
                  ? 'bg-secondary text-white'
                  : 'bg-white text-gray-700 card-shadow'
              }`}
            >
              {difficulty === '全部' ? difficulty : difficultyLabels[difficulty]}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filteredRecipes.map(recipe => (
            <div
              key={recipe.id}
              onClick={() => setShowRecipeDetail(recipe.id)}
              className="bg-white rounded-card p-3 card-shadow cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex gap-3">
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-20 h-20 rounded-card object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">{recipe.name}</h3>
                  <p className="text-gray-500 text-sm mb-2">{recipe.description}</p>
                  <div className="flex items-center gap-3">
                    <span className="text-primary font-medium">{recipe.calories} kcal</span>
                    <span className="flex items-center gap-1 text-gray-500 text-xs">
                      <Clock className="w-3 h-3" />
                      {recipe.prepTime}分钟
                    </span>
                    <span className="flex items-center gap-1 text-gray-500 text-xs">
                      <Users className="w-3 h-3" />
                      {recipe.servings}人份
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                {recipe.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <div className="text-center py-12">
            <ChefHat className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">没有找到匹配的菜谱</p>
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
            className="flex flex-col items-center gap-1 text-gray-500 hover:text-primary"
          >
            <Apple className="w-6 h-6" />
            <span className="text-xs">食材</span>
          </button>
          <button
            onClick={() => navigate('/recipes')}
            className="flex flex-col items-center gap-1 text-primary"
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

      {showRecipeDetail && selectedRecipe && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50">
          <div className="bg-white rounded-t-2xl w-full max-w-md max-h-[85vh] overflow-y-auto">
            <div className="relative">
              <img
                src={selectedRecipe.image}
                alt={selectedRecipe.name}
                className="w-full h-56 object-cover"
              />
              <button
                onClick={() => setShowRecipeDetail(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-1">{selectedRecipe.name}</h2>
              <p className="text-gray-500 text-sm mb-4">{selectedRecipe.description}</p>

              <div className="grid grid-cols-4 gap-2 mb-4">
                <div className="bg-gray-50 rounded-card p-2 text-center">
                  <div className="text-primary font-semibold">{selectedRecipe.calories}</div>
                  <div className="text-gray-500 text-xs">kcal</div>
                </div>
                <div className="bg-gray-50 rounded-card p-2 text-center">
                  <div className="text-accent font-semibold">{selectedRecipe.protein}g</div>
                  <div className="text-gray-500 text-xs">蛋白质</div>
                </div>
                <div className="bg-gray-50 rounded-card p-2 text-center">
                  <div className="text-secondary font-semibold">{selectedRecipe.carbs}g</div>
                  <div className="text-gray-500 text-xs">碳水</div>
                </div>
                <div className="bg-gray-50 rounded-card p-2 text-center">
                  <div className="text-gray-700 font-semibold">{selectedRecipe.fat}g</div>
                  <div className="text-gray-500 text-xs">脂肪</div>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{selectedRecipe.prepTime}分钟</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{selectedRecipe.servings}人份</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  selectedRecipe.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                  selectedRecipe.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {difficultyLabels[selectedRecipe.difficulty]}
                </span>
              </div>

              <div className="mb-4">
                <h3 className="font-medium text-gray-800 mb-2">食材</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedRecipe.ingredients.map((ingredient, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-medium text-gray-800 mb-2">标签</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedRecipe.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setShowRecipeDetail(null)}
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
