export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  settings: UserSettings;
  createdAt: string;
}

export interface UserSettings {
  stations: {
    home: string;
    work: string;
  };
  preferences: {
    temperatureSensitivity: 'cold' | 'normal' | 'warm';
    style: 'casual' | 'business' | 'sporty';
    notifications: {
      morningAlert: boolean;
      weatherWarning: boolean;
    };
  };
  appearance: {
    theme: 'light' | 'dark' | 'auto';
    language: 'ja' | 'en';
  };
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}