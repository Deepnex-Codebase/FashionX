import axios from 'axios';
import { getAuthToken } from './cookieUtils';

// Create a custom axios instance with base configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080',
  withCredentials: true, // Important: This enables sending cookies with requests
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 15000 // Increased timeout to prevent hanging requests
});



// Add a request interceptor to add auth token to every request
api.interceptors.request.use(
  config => {
    // Get token from cookie
    const token = getAuthToken();
    
    // If token exists, add it to the Authorization header
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      
    } else {
      
    }
    
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle common errors
api.interceptors.response.use(
  response => {
    // Log successful responses for debugging
    
    return response;
  },
  error => {
    // Log detailed error information
    
    // Check if error.response exists before accessing status
    if (error.response) {
    } else {
    }
    
    if (error.code === 'ERR_NETWORK') {
      // Add retry mechanism for network errors
      const originalRequest = error.config;
      
      // Initialize retry count if it doesn't exist
      if (originalRequest._retryCount === undefined) {
        originalRequest._retryCount = 0;
      }
      
      // Only retry if we haven't already tried 3 times
      if (originalRequest._retryCount < 3) {
        originalRequest._retryCount += 1;
        
        
        // Wait for 1 second before retrying
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(api(originalRequest));
          }, 1000);
        });
      }
      
      // If we've already retried 3 times, reject with a more user-friendly message
      error.userFriendlyMessage = 'Cannot connect to server. Please check your internet connection and try again.';
      
      // Check if backend server is running
    }
    
    // Handle 404 errors specifically for auth endpoints
    if (error.response && error.response.status === 404) {
      // For auth verification endpoints, provide more detailed logging
      if (error.config.url.includes('/auth/verify')) {
      }
    }
    
    // Handle authentication errors
    if (error.response && error.response.status === 401) {
      
      
      // Check if we're in the login process
      const isLoginProcess = window.location.pathname === '/login' || 
                            window.location.pathname === '/register' ||
                            (typeof window !== 'undefined' && 
                             (window.location.href.includes('/auth/login') || 
                              window.location.href.includes('/login') ||
                              window.location.href.includes('/register')));
      
      
      
      
      // Only redirect if we're not in the login process
      if (!isLoginProcess) {
        
        // Redirect to login page
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      } else {
        
      }
    }
    
    return Promise.reject(error);
  }
);

// Export the API instance
export default api;
