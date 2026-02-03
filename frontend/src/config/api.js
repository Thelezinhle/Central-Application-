/**
 * API Configuration
 * Handles different environments (development, staging, production)
 */

const getApiBaseUrl = () => {
  const env = import.meta.env.MODE || 'development';
  const apiUrl = import.meta.env.VITE_API_URL;

  if (apiUrl) {
    return apiUrl;
  }

  // Fallback based on environment
  const baseUrls = {
    development: 'http://localhost:5000',
    staging: process.env.VITE_API_URL_STAGING || 'https://api-staging.example.com',
    production: process.env.VITE_API_URL_PRODUCTION || 'https://api.example.com'
  };

  return baseUrls[env] || baseUrls.development;
};

export const API_BASE_URL = getApiBaseUrl();

export const API_ENDPOINTS = {
  UNIVERSITIES: `${API_BASE_URL}/api/universities`,
  APPLICATIONS: `${API_BASE_URL}/api/applications`,
  COURSES: `${API_BASE_URL}/api/courses`,
  USERS: `${API_BASE_URL}/api/users`,
  AUTH: `${API_BASE_URL}/api/auth`
};

export const buildUniversitiesUrl = (params = {}) => {
  const url = new URL(API_ENDPOINTS.UNIVERSITIES);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value);
    }
  });
  return url.toString();
};

export const fetchWithErrorHandling = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Request failed:', error);
    throw error;
  }
};

export default {
  API_BASE_URL,
  API_ENDPOINTS,
  buildUniversitiesUrl,
  fetchWithErrorHandling
};
