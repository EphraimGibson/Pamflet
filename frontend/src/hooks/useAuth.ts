import { useState, useEffect, useCallback } from 'react';
import { AuthService, LoginRequest, RegisterRequest, UserModel } from '../services/authService';

/**
 * Custom hook for handling authentication state and operations
 */
export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(AuthService.isAuthenticated());
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Update authentication state when the token changes
  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(AuthService.isAuthenticated());
    };

    // Check initial authentication status
    checkAuth();

    // Set up storage event listener to sync auth state across tabs
    window.addEventListener('storage', checkAuth);

    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  /**
   * Log in a user with the provided credentials
   */
  const login = useCallback(async (credentials: LoginRequest): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      await AuthService.login(credentials);
      setIsAuthenticated(true);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Register a new user with the provided data
   */
  const register = useCallback(async (userData: RegisterRequest): Promise<UserModel | null> => {
    setLoading(true);
    setError(null);

    try {
      const user = await AuthService.register(userData);
      return user;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Log out the current user
   */
  const logout = useCallback(() => {
    AuthService.logout();
    setIsAuthenticated(false);
  }, []);

  return {
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout,
    clearError: () => setError(null),
  };
};
