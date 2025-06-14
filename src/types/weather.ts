export interface WeatherData {
  location: string;
  temperature: number;
  feelsLike: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  timestamp: string;
}

export interface StationSettings {
  homeStation: string;
  workStation: string;
}

export interface OutfitRecommendation {
  id: string;
  category: 'tops' | 'bottoms' | 'outerwear' | 'footwear' | 'accessories';
  item: string;
  icon: string;
  reason?: string;
}

export interface UserPreferences {
  temperatureSensitivity: 'cold' | 'normal' | 'warm';
  style: 'casual' | 'business' | 'sporty';
  favoriteColors: string[];
}

export interface DailyOutfit {
  date: string;
  weather: WeatherData;
  recommendations: OutfitRecommendation[];
  userRating?: number;
  actualOutfit?: string[];
}