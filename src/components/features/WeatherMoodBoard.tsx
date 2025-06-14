'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { WEATHER_ICONS, OUTFIT_ICONS } from '@/constants/weather';

interface WeatherData {
  location: string;
  temperature: number;
  feelsLike: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  timestamp: string;
}

interface OutfitRecommendation {
  category: string;
  item: string;
  icon: string;
  reason?: string;
}

interface WeatherMoodBoardProps {
  homeStation: string;
  workStation: string;
}

export default function WeatherMoodBoard({ homeStation, workStation }: WeatherMoodBoardProps) {
  const [currentTime, setCurrentTime] = useState(7);
  const [weatherData, setWeatherData] = useState<{
    home: WeatherData | null;
    work: WeatherData | null;
  }>({
    home: null,
    work: null,
  });
  const [recommendations, setRecommendations] = useState<OutfitRecommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeatherData();
  }, [homeStation, workStation]);

  useEffect(() => {
    updateRecommendations();
  }, [currentTime, weatherData]);

  const fetchWeatherData = async () => {
    setLoading(true);
    try {
      // 模擬的な天気データ（実際の実装では天気APIを呼び出し）
      const mockHomeWeather: WeatherData = {
        location: homeStation,
        temperature: 15,
        feelsLike: 13,
        condition: 'partly_cloudy',
        humidity: 65,
        windSpeed: 2.5,
        timestamp: new Date().toISOString(),
      };

      const mockWorkWeather: WeatherData = {
        location: workStation,
        temperature: 18,
        feelsLike: 16,
        condition: 'sunny',
        humidity: 55,
        windSpeed: 1.8,
        timestamp: new Date().toISOString(),
      };

      setWeatherData({
        home: mockHomeWeather,
        work: mockWorkWeather,
      });
    } catch (error) {
      console.error('Weather fetch failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateRecommendations = () => {
    if (!weatherData.home || !weatherData.work) return;

    const currentWeather = currentTime < 12 ? weatherData.home : weatherData.work;
    const temp = currentWeather.feelsLike;

    let newRecommendations: OutfitRecommendation[] = [];

    if (temp < 10) {
      newRecommendations = [
        { category: 'outerwear', item: 'ダウンコート', icon: OUTFIT_ICONS.coat },
        { category: 'tops', item: 'セーター', icon: OUTFIT_ICONS.sweater },
        { category: 'accessories', item: '手袋', icon: OUTFIT_ICONS.gloves },
        { category: 'accessories', item: 'マフラー', icon: OUTFIT_ICONS.scarf },
      ];
    } else if (temp < 16) {
      newRecommendations = [
        { category: 'outerwear', item: 'ジャケット', icon: OUTFIT_ICONS.jacket },
        { category: 'tops', item: '長袖シャツ', icon: OUTFIT_ICONS.shirt },
        { category: 'bottoms', item: 'ロングパンツ', icon: OUTFIT_ICONS.jeans },
        { category: 'footwear', item: 'スニーカー', icon: OUTFIT_ICONS.sneakers },
      ];
    } else if (temp < 22) {
      newRecommendations = [
        { category: 'outerwear', item: 'カーディガン', icon: OUTFIT_ICONS.cardigan },
        { category: 'tops', item: '長袖シャツ', icon: OUTFIT_ICONS.shirt },
        { category: 'bottoms', item: 'チノパン', icon: OUTFIT_ICONS.jeans },
        { category: 'footwear', item: 'スニーカー', icon: OUTFIT_ICONS.sneakers },
      ];
    } else if (temp < 28) {
      newRecommendations = [
        { category: 'tops', item: '半袖シャツ', icon: OUTFIT_ICONS.tshirt },
        { category: 'bottoms', item: 'デニム', icon: OUTFIT_ICONS.jeans },
        { category: 'footwear', item: 'スニーカー', icon: OUTFIT_ICONS.sneakers },
      ];
    } else {
      newRecommendations = [
        { category: 'tops', item: 'Tシャツ', icon: OUTFIT_ICONS.tshirt },
        { category: 'bottoms', item: 'ショートパンツ', icon: OUTFIT_ICONS.shorts },
        { category: 'accessories', item: 'サングラス', icon: OUTFIT_ICONS.sunglasses },
        { category: 'accessories', item: '帽子', icon: OUTFIT_ICONS.hat },
      ];
    }

    setRecommendations(newRecommendations);
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny': return WEATHER_ICONS.sunny;
      case 'partly_cloudy': return WEATHER_ICONS.partlyCloudy;
      case 'cloudy': return WEATHER_ICONS.cloudy;
      case 'rainy': return WEATHER_ICONS.rainy;
      default: return WEATHER_ICONS.sunny;
    }
  };

  const getGradientByTemp = (temp: number) => {
    if (temp < 10) return 'from-blue-400 via-blue-500 to-blue-600';
    if (temp < 16) return 'from-blue-300 via-cyan-400 to-teal-500';
    if (temp < 22) return 'from-green-300 via-emerald-400 to-green-500';
    if (temp < 28) return 'from-yellow-300 via-orange-400 to-orange-500';
    return 'from-orange-400 via-red-400 to-red-500';
  };

  const getTempDescription = (homeTemp: number, workTemp: number) => {
    const diff = Math.abs(workTemp - homeTemp);
    if (diff <= 2) return '一日中安定した気温';
    if (homeTemp < workTemp) return '朝は涼しく、昼は暖かい';
    return '朝は暖かく、昼は涼しい';
  };

  if (loading) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-24 bg-gray-200 rounded"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!weatherData.home || !weatherData.work) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 text-center">
        <p className="text-gray-500">天気データを取得できませんでした</p>
      </div>
    );
  }

  const currentWeather = currentTime < 12 ? weatherData.home : weatherData.work;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden"
    >
      {/* Weather Mood Board */}
      <motion.div
        className={`bg-gradient-to-br ${getGradientByTemp(currentWeather.feelsLike)} p-8 text-white relative overflow-hidden`}
        animate={{
          background: `linear-gradient(135deg, ${getGradientByTemp(currentWeather.feelsLike)})`
        }}
        transition={{ duration: 1 }}
      >
        {/* Background Animation */}
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          style={{
            backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)',
            backgroundSize: '50px 50px',
          }}
        />

        <div className="relative z-10">
          <div className="text-center mb-6">
            <motion.div
              className="text-8xl mb-4"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {getWeatherIcon(currentWeather.condition)}
            </motion.div>
            <h2 className="text-2xl font-bold mb-2">
              {currentTime < 12 ? '朝の天気' : '昼の天気'}
            </h2>
            <p className="text-lg opacity-90">
              {currentWeather.location}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <motion.div
              className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-sm opacity-80 mb-1">気温</div>
              <div className="text-2xl font-bold">
                {Math.round(currentWeather.temperature)}°C
              </div>
            </motion.div>
            <motion.div
              className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-sm opacity-80 mb-1">体感温度</div>
              <div className="text-2xl font-bold">
                {Math.round(currentWeather.feelsLike)}°C
              </div>
            </motion.div>
          </div>

          <div className="text-center">
            <p className="text-sm opacity-90">
              {getTempDescription(weatherData.home.feelsLike, weatherData.work.feelsLike)}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Time Slider */}
      <div className="p-6 border-b border-gray-100">
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>朝 7:00</span>
            <span className="font-medium">現在: {currentTime}:00</span>
            <span>夜 19:00</span>
          </div>
          <div className="relative">
            <input
              type="range"
              min="7"
              max="19"
              value={currentTime}
              onChange={(e) => setCurrentTime(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <style jsx>{`
              .slider::-webkit-slider-thumb {
                appearance: none;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: linear-gradient(135deg, #3b82f6, #8b5cf6);
                cursor: pointer;
                border: 2px solid white;
                box-shadow: 0 2px 6px rgba(0,0,0,0.2);
              }
              .slider::-moz-range-thumb {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: linear-gradient(135deg, #3b82f6, #8b5cf6);
                cursor: pointer;
                border: 2px solid white;
                box-shadow: 0 2px 6px rgba(0,0,0,0.2);
              }
            `}</style>
          </div>
        </div>
      </div>

      {/* Outfit Recommendations */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <span className="mr-2">✨</span>
          今日のおすすめコーデ
        </h3>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {recommendations.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-gray-50 rounded-xl p-3 flex items-center space-x-3"
            >
              <div className="text-2xl">{item.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 text-sm truncate">
                  {item.item}
                </div>
                <div className="text-xs text-gray-500 capitalize">
                  {item.category}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Quick Actions */}
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-xl transition-colors"
          >
            履歴を見る
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 shadow-lg"
          >
            これで決定！
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}