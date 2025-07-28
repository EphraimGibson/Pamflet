import { apiRequest, API_ENDPOINTS } from './api';
import { APP_CONFIG } from '../config';

// Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface UserModel {
  id?: number;
  username: string;
  email: string;
  role?: string;
}

export class AuthService {
  // Store the authentication token
  private static _token: string | null = localStorage.getItem(APP_CONFIG.tokenStorageKey);

  // Get the current authentication token
  static get token(): string | null {
    return this._token;
  }

  // Set the authentication token and store it in localStorage
  static set token(value: string | null) {
    this._token = value;
    if (value) {
      localStorage.setItem(APP_CONFIG.tokenStorageKey, value);
    } else {
      localStorage.removeItem(APP_CONFIG.tokenStorageKey);
    }
  }

  // Check if the user is authenticated
  static isAuthenticated(): boolean {
    return !!this._token;
  }

  /**
   * Log in a user with email and password
   * @param credentials The login credentials
   * @returns A promise resolving to the authentication token
   */
  static async login(credentials: LoginRequest): Promise<string> {
    const response = await apiRequest<TokenResponse>(API_ENDPOINTS.LOGIN, 'POST', credentials);

    if (response.error) {
      throw new Error(response.error);
    }

    if (!response.data) {
      throw new Error('No token received from server');
    }

    const tokenResponse = response.data;

    // Store the token
    this.token = tokenResponse.token;
    return tokenResponse.token;
  }

  /**
   * Register a new user
   * @param userData The user registration data
   * @returns A promise resolving to the created user model
   */
  static async register(userData: RegisterRequest): Promise<UserModel> {
    const response = await apiRequest<UserModel>(API_ENDPOINTS.REGISTER, 'POST', userData);

    if (response.error) {
      throw new Error(response.error);
    }

    if (!response.data) {
      throw new Error('No user data received from server');
    }

    return response.data;
  }

  /**
   * Log out the current user
   */
  static logout(): void {
    this.token = null;
  }
}
