'use client';

import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import WeatherMoodBoard from '@/components/features/WeatherMoodBoard';

export default function DashboardPage() {
  // 実際の実装では、ユーザー設定から取得
  const homeStation = '渋谷';
  const workStation = '新宿';

  return (
    <Layout>
      <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  おはようございます！ 🌅
                </h1>
                <p className="text-gray-600">
                  今日の天気に合わせた服装をお選びしました
                </p>
              </div>
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="hidden sm:block"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  WD
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Weather Mood Board */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <WeatherMoodBoard
                homeStation={homeStation}
                workStation={workStation}
              />
            </div>

            {/* Side Panel */}
            <div className="space-y-6">
              {/* Weather Summary */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">📍</span>
                  今日のルート
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span className="text-gray-700">{homeStation}</span>
                    </div>
                    <span className="text-sm text-gray-500">15°C</span>
                  </div>
                  <div className="border-l-2 border-dashed border-gray-300 ml-1 h-4"></div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                      <span className="text-gray-700">{workStation}</span>
                    </div>
                    <span className="text-sm text-gray-500">18°C</span>
                  </div>
                </div>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">📊</span>
                  今週の統計
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">服装的中率</span>
                    <span className="font-semibold text-green-600">94%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">使用日数</span>
                    <span className="font-semibold text-blue-600">5日</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">満足度</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className="text-yellow-500">⭐</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="space-y-3"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 shadow-lg flex items-center justify-center"
                >
                  <span className="mr-2">⚙️</span>
                  設定を変更
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center"
                >
                  <span className="mr-2">📱</span>
                  アプリで開く
                </motion.button>
              </motion.div>
            </div>
          </div>

          {/* Recent History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <span className="mr-2">📅</span>
              最近の履歴
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { date: '今日', weather: '🌤️', temp: '15°C', outfit: '長袖シャツ + カーディガン' },
                { date: '昨日', weather: '☀️', temp: '22°C', outfit: 'Tシャツ + デニム' },
                { date: '2日前', weather: '🌧️', temp: '12°C', outfit: 'レインコート + ブーツ' },
              ].map((day, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                  className="bg-gray-50 rounded-xl p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{day.date}</span>
                    <div className="flex items-center space-x-1">
                      <span className="text-lg">{day.weather}</span>
                      <span className="text-sm text-gray-500">{day.temp}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{day.outfit}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}