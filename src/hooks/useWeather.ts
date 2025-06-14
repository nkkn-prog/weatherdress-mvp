import { useEffect } from 'react';
import { useWeatherStore, useSettingsStore, weatherActions } from '@/lib/store';

/**
 * 天気データを管理するカスタムフック
 */
export function useWeather() {
  const {
    homeWeather,
    workWeather,
    recommendations,
    lastUpdated,
    isLoading,
    error,
  } = useWeatherStore();

  const { stations } = useSettingsStore();

  // 天気データを更新する関数
  const fetchWeatherData = async () => {
    if (stations.homeStation && stations.workStation) {
      await weatherActions.fetchWeatherData(stations.homeStation, stations.workStation);
    }
  };

  // 駅設定が変更されたら自動的に天気データを取得
  useEffect(() => {
    if (stations.homeStation && stations.workStation) {
      fetchWeatherData();
    }
  }, [stations.homeStation, stations.workStation]);

  // 定期的な更新（5分ごと）
  useEffect(() => {
    const interval = setInterval(() => {
      if (stations.homeStation && stations.workStation) {
        fetchWeatherData();
      }
    }, 5 * 60 * 1000); // 5分

    return () => clearInterval(interval);
  }, [stations.homeStation, stations.workStation]);

  return {
    homeWeather,
    workWeather,
    recommendations,
    lastUpdated,
    isLoading,
    error,
    refetch: fetchWeatherData,
  };
}

/**
 * 現在の時間に基づいて適切な天気データを返すフック
 */
export function useCurrentWeather() {
  const { homeWeather, workWeather } = useWeather();
  
  const currentHour = new Date().getHours();
  
  // 朝（7時～12時）は自宅の天気、昼以降は職場の天気を優先
  const currentWeather = currentHour < 12 ? homeWeather : workWeather;
  const alternateWeather = currentHour < 12 ? workWeather : homeWeather;

  return {
    current: currentWeather,
    alternate: alternateWeather,
    timeOfDay: currentHour < 12 ? 'morning' : 'afternoon',
  };
}