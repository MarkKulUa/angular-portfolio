import { Environment } from './environment';

export const environment: Environment = {
  production: true,
  apiUrl: 'https://angular-portfolio-backend.vercel.app/api',
  apiTimeout: 30000,
  features: {
    analytics: true,
    darkMode: true,
  },
};
