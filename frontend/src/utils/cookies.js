import Cookies from 'js-cookie';

// Cookie names
const TOKEN_COOKIE = 'fashionx_token';

// Get auth token from cookie
export const getAuthToken = () => {
  try {
    // Try to get from cookie
    let token = Cookies.get(TOKEN_COOKIE);
    
    // If not found, try localStorage
    if (!token && typeof window !== 'undefined') {
      try {
        token = localStorage.getItem('auth_token');
      } catch (localError) {
        // Ignore localStorage errors
      }
    }
    
    return token;
  } catch (error) {
    return null;
  }
};

// Set auth token in cookie
export const setAuthToken = (token) => {
  if (!token) return false;
  try {
    // Set in cookie
    Cookies.set(TOKEN_COOKIE, token, { expires: 7 }); // 7 days expiry
    
    // Also update localStorage for redundancy
    try {
      localStorage.setItem('auth_token', token);
    } catch (localError) {
      // Ignore localStorage errors
    }
    
    return true;
  } catch (error) {
    return false;
  }
};

// Remove auth token from cookie
export const removeAuthToken = () => {
  try {
    // Remove from cookie
    Cookies.remove(TOKEN_COOKIE);
    
    // Also remove from localStorage
    try {
      localStorage.removeItem('auth_token');
    } catch (localError) {
      // Ignore localStorage errors
    }
    
    return true;
  } catch (error) {
    return false;
  }
};