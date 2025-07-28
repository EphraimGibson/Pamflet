// Application configuration with environment-specific settings

// API Configuration
const DEV_API_URL = 'http://localhost:8080';
const PROD_API_URL = 'https://api.yourdomain.com'; // Update this when deployed

// Use appropriate API URL based on environment
export const API_URL = import.meta.env.PROD ? PROD_API_URL : DEV_API_URL;

// Feature flags
export const FEATURES = {
  enableGoogleAuth: false, // Set to true when Google Auth is implemented
};

// Other application-wide settings
export const APP_CONFIG = {
  tokenStorageKey: 'auth_token',
  userStorageKey: 'user_info',
};
