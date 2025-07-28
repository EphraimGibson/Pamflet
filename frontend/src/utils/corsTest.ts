import { apiRequest, API_ENDPOINTS } from '../services/api';

/**
 * Test function to check if CORS is working properly
 * Call this from your component to verify CORS configuration
 */
export async function testCorsConnection(): Promise<boolean> {
  try {
    console.log('Testing CORS connection...');
    const response = await apiRequest<string>(API_ENDPOINTS.CORS_TEST);

    if (response.error) {
      console.error('CORS test failed:', response.error);
      return false;
    }

    console.log('CORS test succeeded:', response.data);
    return true;
  } catch (error) {
    console.error('CORS test error:', error);
    return false;
  }
}
