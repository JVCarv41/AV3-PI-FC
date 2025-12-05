import axios from 'axios';
import ErrorHandler from './ErrorHandler';

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  message: string;
  user: {
    name: string;
    email: string;
    password: string;
    _id: string;
    __v: number;
  };
}

async function registerUser(
  apiUrl: string,
  name: string,
  email: string,
  password: string
): Promise<RegisterResponse> {
  const method = 'POST';
  const requestData: RegisterRequest = { name, email, password };
  const fullUrl = `${apiUrl}/api/register`;
  const timeoutSeconds = 20;

  try {
    const response = await axios.post<RegisterResponse>(
      fullUrl,
      requestData,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        timeout: 1000*timeoutSeconds,
      }
    );
    console.log(`${method} request successful to ${fullUrl}`, {
      status: response.status,
      data: response.data
    });
    return response.data;
  } catch (error) {
    ErrorHandler('RegisterUser', error);
    throw error;
  }
}

export default registerUser;
