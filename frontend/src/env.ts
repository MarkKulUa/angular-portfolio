export const env = {
  production: import.meta.env.PROD,
  apiUrl: import.meta.env.VITE_API_URL ?? "http://localhost:3000/api",
  apiTimeout: Number(import.meta.env.VITE_API_TIMEOUT ?? "30000"),
  features: {
    analytics: import.meta.env.VITE_FEATURE_ANALYTICS === "true",
    darkMode: import.meta.env.VITE_FEATURE_DARK_MODE !== "false",
  },
} as const;
