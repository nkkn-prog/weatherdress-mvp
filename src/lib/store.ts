import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { WeatherData, StationSettings, OutfitRecommendation, UserPreferences } from '@/types/weather';
import type { AuthState, User } from '@/types/user';

// Auth Store
interface AuthStore extends AuthState {
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        isLoading: false,
        error: null,

        login: (user: User) => set({ user, error: null }),
        
        logout: () => set({ user: null, error: null }),
        
        updateUser: (updates: Partial<User>) => {
          const currentUser = get().user;
          if (currentUser) {
            set({ user: { ...currentUser, ...updates } });
          }
        },
        
        setLoading: (isLoading: boolean) => set({ isLoading }),
        
        setError: (error: string | null) => set({ error }),
      }),
      {
        name: 'auth-storage',
        partialize: (state) => ({ user: state.user }),
      }
    ),
    { name: 'auth-store' }
  )
);

// Weather Store
interface WeatherStore {
  homeWeather: WeatherData | null;
  workWeather: WeatherData | null;
  recommendations: OutfitRecommendation[];
  lastUpdated: string | null;
  isLoading: boolean;
  error: string | null;
  
  setHomeWeather: (weather: WeatherData) => void;
  setWorkWeather: (weather: WeatherData) => void;
  setRecommendations: (recommendations: OutfitRecommendation[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearWeatherData: () => void;
}

export const useWeatherStore = create<WeatherStore>()(
  devtools(
    (set) => ({
      homeWeather: null,
      workWeather: null,
      recommendations: [],
      lastUpdated: null,
      isLoading: false,
      error: null,

      setHomeWeather: (homeWeather: WeatherData) => 
        set({ homeWeather, lastUpdated: new Date().toISOString() }),
      
      setWorkWeather: (workWeather: WeatherData) => 
        set({ workWeather, lastUpdated: new Date().toISOString() }),
      
      setRecommendations: (recommendations: OutfitRecommendation[]) => 
        set({ recommendations }),
      
      setLoading: (isLoading: boolean) => set({ isLoading }),
      
      setError: (error: string | null) => set({ error }),
      
      clearWeatherData: () => set({
        homeWeather: null,
        workWeather: null,
        recommendations: [],
        lastUpdated: null,
        error: null,
      }),
    }),
    { name: 'weather-store' }
  )
);

// Settings Store
interface SettingsStore {
  stations: StationSettings;
  preferences: UserPreferences;
  
  setStations: (stations: StationSettings) => void;
  setPreferences: (preferences: UserPreferences) => void;
  updateStations: (updates: Partial<StationSettings>) => void;
  updatePreferences: (updates: Partial<UserPreferences>) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  devtools(
    persist(
      (set, get) => ({
        stations: {
          homeStation: '',
          workStation: '',
        },
        preferences: {
          temperatureSensitivity: 'normal',
          style: 'casual',
          favoriteColors: [],
        },

        setStations: (stations: StationSettings) => set({ stations }),
        
        setPreferences: (preferences: UserPreferences) => set({ preferences }),
        
        updateStations: (updates: Partial<StationSettings>) => {
          const currentStations = get().stations;
          set({ stations: { ...currentStations, ...updates } });
        },
        
        updatePreferences: (updates: Partial<UserPreferences>) => {
          const currentPreferences = get().preferences;
          set({ preferences: { ...currentPreferences, ...updates } });
        },
      }),
      {
        name: 'settings-storage',
      }
    ),
    { name: 'settings-store' }
  )
);

// UI Store (非永続化)
interface UIStore {
  isMobileMenuOpen: boolean;
  isInstallPromptVisible: boolean;
  activeModal: string | null;
  notifications: Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    timestamp: number;
  }>;
  
  setMobileMenuOpen: (open: boolean) => void;
  setInstallPromptVisible: (visible: boolean) => void;
  setActiveModal: (modal: string | null) => void;
  addNotification: (notification: Omit<UIStore['notifications'][0], 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export const useUIStore = create<UIStore>()(
  devtools(
    (set, get) => ({
      isMobileMenuOpen: false,
      isInstallPromptVisible: false,
      activeModal: null,
      notifications: [],

      setMobileMenuOpen: (isMobileMenuOpen: boolean) => set({ isMobileMenuOpen }),
      
      setInstallPromptVisible: (isInstallPromptVisible: boolean) => set({ isInstallPromptVisible }),
      
      setActiveModal: (activeModal: string | null) => set({ activeModal }),
      
      addNotification: (notification) => {
        const id = Math.random().toString(36).substr(2, 9);
        const timestamp = Date.now();
        const newNotification = { ...notification, id, timestamp };
        
        set((state) => ({
          notifications: [...state.notifications, newNotification],
        }));

        // 5秒後に自動削除
        setTimeout(() => {
          get().removeNotification(id);
        }, 5000);
      },
      
      removeNotification: (id: string) => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        }));
      },
      
      clearNotifications: () => set({ notifications: [] }),
    }),
    { name: 'ui-store' }
  )
);

// Combined Store Hooks（複数のストアを組み合わせて使用する場合）
export const useAppStore = () => {
  const auth = useAuthStore();
  const weather = useWeatherStore();
  const settings = useSettingsStore();
  const ui = useUIStore();

  return {
    auth,
    weather,
    settings,
    ui,
  };
};

// Store Actions（複雑なロジックを含むアクション）
export const weatherActions = {
  async fetchWeatherData(homeStation: string, workStation: string) {
    const { setLoading, setError, setHomeWeather, setWorkWeather } = useWeatherStore.getState();
    
    setLoading(true);
    setError(null);
    
    try {
      // 模擬的なAPI呼び出し（実際の実装では実際のAPIを呼び出し）
      const mockHomeWeather: WeatherData = {
        location: homeStation,
        temperature: 15 + Math.random() * 10,
        feelsLike: 13 + Math.random() * 10,
        condition: ['sunny', 'partly_cloudy', 'cloudy'][Math.floor(Math.random() * 3)],
        humidity: 50 + Math.random() * 30,
        windSpeed: Math.random() * 5,
        icon: '🌤️',
        timestamp: new Date().toISOString(),
      };

      const mockWorkWeather: WeatherData = {
        location: workStation,
        temperature: 16 + Math.random() * 10,
        feelsLike: 14 + Math.random() * 10,
        condition: ['sunny', 'partly_cloudy', 'cloudy'][Math.floor(Math.random() * 3)],
        humidity: 45 + Math.random() * 30,
        windSpeed: Math.random() * 5,
        icon: '☀️',
        timestamp: new Date().toISOString(),
      };

      // 遅延をシミュレート
      await new Promise(resolve => setTimeout(resolve, 1000));

      setHomeWeather(mockHomeWeather);
      setWorkWeather(mockWorkWeather);
    } catch (error) {
      setError(error instanceof Error ? error.message : '天気データの取得に失敗しました');
    } finally {
      setLoading(false);
    }
  },
};

export const authActions = {
  async loginWithCredentials(email: string, password: string) {
    const { setLoading, setError, login } = useAuthStore.getState();
    
    setLoading(true);
    setError(null);
    
    try {
      // 模擬的なログイン処理
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: 'user-123',
        email,
        name: email.split('@')[0],
        settings: {
          stations: {
            home: '',
            work: '',
          },
          preferences: {
            temperatureSensitivity: 'normal',
            style: 'casual',
            notifications: {
              morningAlert: true,
              weatherWarning: true,
            },
          },
          appearance: {
            theme: 'light',
            language: 'ja',
          },
        },
        createdAt: new Date().toISOString(),
      };

      login(mockUser);
      
      // 通知を追加
      const { addNotification } = useUIStore.getState();
      addNotification({
        type: 'success',
        message: 'ログインしました',
      });
    } catch (error) {
      setError(error instanceof Error ? error.message : 'ログインに失敗しました');
    } finally {
      setLoading(false);
    }
  },
};