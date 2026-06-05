import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, UtensilsCrossed, History as HistoryIcon, Settings, Apple, TrendingUp, Download } from 'lucide-react';
import { generateWeeklyStats, generateMonthlyStats, generateYearlyStats } from '../data/mockData';
import type { DailyStats, TimeRange } from '../types';

export default function History() {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState<TimeRange>('week');
  const [weeklyData, setWeeklyData] = useState<DailyStats[]>([]);
  const [monthlyData, setMonthlyData] = useState<DailyStats[]>([]);
  const [yearlyData, setYearlyData] = useState<{ month: string; avgCalories: number }[]>([]);

  useEffect(() => {
    setWeeklyData(generateWeeklyStats());
    setMonthlyData(generateMonthlyStats());
    setYearlyData(generateYearlyStats());
  }, []);

  const calculateStats = (data: DailyStats[]) => {
    const total = data.reduce(
      (acc, item) => ({
        calories: acc.calories + item.calories,
        protein: acc.protein + item.protein,
        carbs: acc.carbs + item.carbs,
        fat: acc.fat + item.fat,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
    const count = data.length;
    return {
      avgCalories: Math.round(total.calories / count),
      avgProtein: Math.round(total.protein / count),
      avgCarbs: Math.round(total.carbs / count),
      avgFat: Math.round(total.fat / count),
    };
  };

  const handleExport = () => {
    const exportData = {
      timeRange,
      date: new Date().toISOString(),
      weeklyData,
      monthlyData,
      yearlyData,
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `diet-history-${timeRange}-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <header className="bg-white card-shadow sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-semibold text-gray-800">历史数据</h1>
              <p className="text-gray-500 text-sm">查看您的饮食记录趋势</p>
            </div>
            <button
              onClick={() => navigate('/settings')}
              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div className="flex gap-2 mb-4">
            {(['week', 'month', 'year'] as TimeRange[]).map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`flex-1 py-2 rounded-button text-sm font-medium transition-colors ${
                  timeRange === range
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {range === 'week' ? '周' : range === 'month' ? '月' : '年'}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-card p-4 card-shadow">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span className="text-gray-500 text-sm">平均热量</span>
            </div>
            <div className="text-2xl font-semibold text-gray-800">
              {timeRange === 'year' 
                ? yearlyData.length > 0 
                  ? Math.round(yearlyData.reduce((sum, m) => sum + m.avgCalories, 0) / yearlyData.length)
                  : 0
                : calculateStats(timeRange === 'week' ? weeklyData : monthlyData).avgCalories
              }
              <span className="text-sm font-normal text-gray-500 ml-1">kcal</span>
            </div>
          </div>

          <div className="bg-white rounded-card p-4 card-shadow">
            <div className="flex items-center gap-2 mb-2">
              <Download className="w-5 h-5 text-accent" />
              <span className="text-gray-500 text-sm">记录天数</span>
            </div>
            <div className="text-2xl font-semibold text-gray-800">
              {timeRange === 'year' ? '12' : timeRange === 'week' ? '7' : '30'}
              <span className="text-sm font-normal text-gray-500 ml-1">天</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-card p-4 card-shadow">
          <h3 className="font-medium text-gray-800 mb-4">营养摄入统计</h3>
          <div className="grid grid-cols-2 gap-3">
            {timeRange !== 'year' && (
              <>
                <div className="bg-green-50 rounded-card p-3">
                  <div className="text-gray-500 text-xs mb-1">蛋白质</div>
                  <div className="text-green-600 font-semibold">
                    {calculateStats(timeRange === 'week' ? weeklyData : monthlyData).avgProtein}g
                  </div>
                </div>
                <div className="bg-blue-50 rounded-card p-3">
                  <div className="text-gray-500 text-xs mb-1">碳水</div>
                  <div className="text-blue-600 font-semibold">
                    {calculateStats(timeRange === 'week' ? weeklyData : monthlyData).avgCarbs}g
                  </div>
                </div>
                <div className="bg-orange-50 rounded-card p-3">
                  <div className="text-gray-500 text-xs mb-1">脂肪</div>
                  <div className="text-orange-600 font-semibold">
                    {calculateStats(timeRange === 'week' ? weeklyData : monthlyData).avgFat}g
                  </div>
                </div>
              </>
            )}
            <button
              onClick={handleExport}
              className="bg-gray-50 rounded-card p-3 flex items-center justify-center gap-2 text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span className="text-sm">导出数据</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-card p-4 card-shadow">
          <h3 className="font-medium text-gray-800 mb-4">热量趋势</h3>
          <div className="flex items-end justify-between gap-1 h-32">
            {timeRange === 'year' ? (
              yearlyData.map((item, index) => {
                const max = Math.max(...yearlyData.map(m => m.avgCalories));
                const height = (item.avgCalories / max) * 100;
                return (
                  <div key={index} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full bg-gradient-to-t from-primary to-green-300 rounded-t-sm transition-all duration-500"
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-xs text-gray-500">{item.month}</span>
                  </div>
                );
              })
            ) : timeRange === 'week' ? (
              weeklyData.map((item, index) => {
                const max = Math.max(...weeklyData.map(d => d.calories));
                const height = (item.calories / max) * 100;
                return (
                  <div key={index} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full bg-gradient-to-t from-primary to-green-300 rounded-t-sm transition-all duration-500"
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-xs text-gray-500">{weekDays[new Date(item.date).getDay()]}</span>
                  </div>
                );
              })
            ) : (
              monthlyData.map((item, index) => {
                const max = Math.max(...monthlyData.map(d => d.calories));
                const height = (item.calories / max) * 100;
                return (
                  <div key={index} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full bg-gradient-to-t from-primary to-green-300 rounded-t-sm transition-all duration-500"
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-xs text-gray-500">{new Date(item.date).getDate()}</span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {timeRange !== 'year' && (
          <div className="bg-white rounded-card p-4 card-shadow">
            <h3 className="font-medium text-gray-800 mb-4">每日详情</h3>
            <div className="space-y-2">
              {(timeRange === 'week' ? weeklyData : monthlyData).slice(-7).reverse().map(item => (
                <div key={item.date} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div>
                    <div className="font-medium text-gray-800">
                      {timeRange === 'week' 
                        ? `${new Date(item.date).getMonth() + 1}/${new Date(item.date).getDate()} ${weekDays[new Date(item.date).getDay()]}`
                        : `${new Date(item.date).getMonth() + 1}月${new Date(item.date).getDate()}日`
                      }
                    </div>
                    <div className="text-gray-500 text-xs">
                      {item.protein}g蛋白质 · {item.carbs}g碳水 · {item.fat}g脂肪
                    </div>
                  </div>
                  <div className="text-primary font-semibold">{item.calories} kcal</div>
                </div>
              ))}
            </div>
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
            className="flex flex-col items-center gap-1 text-gray-500 hover:text-primary"
          >
            <UtensilsCrossed className="w-6 h-6" />
            <span className="text-xs">菜谱</span>
          </button>
          <button
            onClick={() => navigate('/history')}
            className="flex flex-col items-center gap-1 text-primary"
          >
            <HistoryIcon className="w-6 h-6" />
            <span className="text-xs">历史</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
