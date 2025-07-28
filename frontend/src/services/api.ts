// API configuration
import { API_URL } from '../config';

// Remove the '/api' here since it's already in the endpoints
export const API_BASE_URL = API_URL;

export const API_ENDPOINTS = {
  LOGIN: '/api/login',
  REGISTER: '/api/register',
  CORS_TEST: '/api/cors-test',
};

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

// Generic API request function with error handling
export async function apiRequest<T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  data?: any,
  token?: string
): Promise<ApiResponse<T>> {
  try {
    console.log(`Making ${method} request to: ${API_BASE_URL}${endpoint}`);
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const config: RequestInit = {
      method,
      headers,
      credentials: 'include', // Include cookies if your backend uses them
      mode: 'cors', // Explicitly enable CORS
    };

    if (data) {
      config.body = JSON.stringify(data);
    }

    console.log('Request config:', {
      url: `${API_BASE_URL}${endpoint}`,
      method,
      headers: config.headers,
      hasBody: !!config.body
    });

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    console.log('Response status:', response.status);

    const contentType = response.headers.get('content-type');
    console.log('Response content-type:', contentType);

    const isJson = contentType?.includes('application/json');

    let responseData: any;
    let responseText: string = '';

    try {
      if (isJson) {
        responseData = await response.json();
        console.log('Response data:', responseData);
      } else {
        // For cases where the API returns plain text (like a token)
        responseText = await response.text();
        console.log('Response text:', responseText);
        // Return the plain text as the data property directly
        return {
          data: responseText as unknown as T,
          status: response.status
        };
      }
    } catch (parseError) {
      console.error('Error parsing response:', parseError);
      return {
        error: `Failed to parse response: ${parseError instanceof Error ? parseError.message : 'Unknown error'}`,
        status: response.status,
      };
    }

    if (!response.ok) {
      return {
        error: responseData.message || 'An error occurred',
        status: response.status,
      };
    }

    return {
      data: responseData,
      status: response.status,
    };
  } catch (error) {
    console.error('Network error:', error);
    return {
      error: error instanceof Error ? `Network error: ${error.message}` : 'Network error',
      status: 0, // 0 indicates network error
    };
  }
}
