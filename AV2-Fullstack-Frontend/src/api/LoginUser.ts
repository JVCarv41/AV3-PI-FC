import axios from 'axios';
import ErrorHandler from './ErrorHandler';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  token: string;
}

async function LoginUser(
  apiUrl: string,
  email: string,
  password: string
): Promise<LoginResponse> {
  const method = 'POST';
  const requestData: LoginRequest = { email, password };
  const fullUrl = `${apiUrl}/api/login`;
  const timeoutSeconds = 20;

  try {
    const response = await axios.post<LoginResponse>(
      fullUrl,
      requestData,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        timeout: 1000 * timeoutSeconds,
      }
    );
    console.log(`${method} request successful to ${fullUrl}`, {
      status: response.status,
      data: { message: response.data.message, token: '******' }
    });
    return response.data;
  } catch (error) {
    ErrorHandler('LoginUser', error);
    throw error;
  }
}

export default LoginUser;
