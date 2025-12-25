import { Environment } from './environment';

export const environment: Environment = {
  production: true,
  apiUrl: 'https://api.production.com/api',
  apiTimeout: 30000,
  features: {
    analytics: true,
    darkMode: true,
  },
};
