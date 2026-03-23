export interface Environment {
  production: boolean;
  apiUrl: string;
  apiTimeout: number;
  features: {
    analytics: boolean;
    darkMode: boolean;
  };
}
