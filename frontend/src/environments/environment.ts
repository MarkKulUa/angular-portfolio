export interface Environment {
  production: boolean;
  apiUrl: string;
  apiTimeout: number;
  features: {
    analytics: boolean;
    darkMode: boolean;
  };
}

export const environment: Environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  apiTimeout: 30000,
  features: {
    analytics: false,
    darkMode: true,
  },
};
