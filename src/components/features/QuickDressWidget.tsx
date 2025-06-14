'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { WEATHER_ICONS, OUTFIT_ICONS } from '@/constants/weather';

interface WidgetData {
  temperature: number;
  condition: string;
  primaryOutfit: string;
  primaryIcon: string;
  location: string;
  lastUpdated: string;
}

interface QuickDressWidgetProps {
  size?: 'small' | 'medium' | 'large';
  homeStation?: string;
  className?: string;
}

export default function QuickDressWidget({ 
  size = 'medium', 
  homeStation = '渋谷',
  className = '' 
}: QuickDressWidgetProps) {
  const [widgetData, setWidgetData] = useState<WidgetData | null>(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    fetchWidgetData();
    // 5分ごとに更新
    const interval = setInterval(fetchWidgetData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [homeStation]);

  const fetchWidgetData = async () => {
    setLoading(true);
    try {
      // 模擬的なウィジェットデータ（実際の実装では軽量なAPIを呼び出し）
      const mockData: WidgetData = {
        temperature: 15,
        condition: 'partly_cloudy',
        primaryOutfit: '長袖シャツ + カーディガン',
        primaryIcon: OUTFIT_ICONS.shirt,
        location: homeStation,
        lastUpdated: new Date().toLocaleTimeString('ja-JP', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
      };

      setWidgetData(mockData);
    } catch (error) {
      console.error('Widget data fetch failed:', error);
    } finally {
      setLoading(false);
    }
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

  const getWidgetSize = () => {
    switch (size) {
      case 'small': return 'w-24 h-24';
      case 'medium': return 'w-32 h-32';
      case 'large': return 'w-40 h-40';
      default: return 'w-32 h-32';
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'small': return 'text-xs';
      case 'medium': return 'text-sm';
      case 'large': return 'text-base';
      default: return 'text-sm';
    }
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`${getWidgetSize()} ${className}`}
      >
        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center animate-pulse">
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      </motion.div>
    );
  }

  if (!widgetData) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`${getWidgetSize()} ${className}`}
      >
        <div className="w-full h-full bg-gradient-to-br from-red-400 to-red-500 rounded-2xl flex items-center justify-center text-white">
          <span className="text-lg">⚠️</span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: expanded ? 1 : 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setExpanded(!expanded)}
      className={`${expanded ? 'w-72' : getWidgetSize()} ${className} cursor-pointer`}
    >
      <motion.div
        layout
        className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl p-3 text-white shadow-lg relative overflow-hidden"
        animate={{
          height: expanded ? 'auto' : undefined,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        <div className="relative z-10">
          {/* Compact View */}
          <motion.div
            layout
            className="flex flex-col items-center justify-center h-full"
          >
            <motion.div
              layout
              className={`${expanded ? 'text-4xl' : 'text-2xl'} mb-1`}
              animate={{ scale: expanded ? 1.2 : 1 }}
            >
              {getWeatherIcon(widgetData.condition)}
            </motion.div>
            
            <motion.div
              layout
              className={`font-bold ${expanded ? 'text-lg' : getTextSize()}`}
            >
              {Math.round(widgetData.temperature)}°C
            </motion.div>
            
            {!expanded && (
              <motion.div
                className={`${getTextSize()} opacity-80 text-center leading-tight`}
                exit={{ opacity: 0 }}
              >
                {widgetData.primaryIcon} {widgetData.primaryOutfit.split(' + ')[0]}
              </motion.div>
            )}
          </motion.div>

          {/* Expanded View */}
          {expanded && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="mt-4 space-y-3"
            >
              {/* Location */}
              <div className="text-center">
                <div className="text-xs opacity-80 mb-1">現在地</div>
                <div className="font-medium">{widgetData.location}</div>
              </div>

              {/* Outfit Recommendation */}
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                <div className="text-xs opacity-80 mb-2">今日のおすすめ</div>
                <div className="flex items-center space-x-2">
                  <span className="text-xl">{widgetData.primaryIcon}</span>
                  <span className="text-sm font-medium flex-1">
                    {widgetData.primaryOutfit}
                  </span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white/20 backdrop-blur-sm rounded-lg py-2 px-3 text-xs font-medium hover:bg-white/30 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.location.href = '/dashboard';
                  }}
                >
                  詳細表示
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white/20 backdrop-blur-sm rounded-lg py-2 px-3 text-xs font-medium hover:bg-white/30 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    fetchWidgetData();
                  }}
                >
                  更新
                </motion.button>
              </div>

              {/* Last Updated */}
              <div className="text-center">
                <div className="text-xs opacity-60">
                  最終更新: {widgetData.lastUpdated}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Loading Indicator for Refresh */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-2 right-2"
          >
            <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}