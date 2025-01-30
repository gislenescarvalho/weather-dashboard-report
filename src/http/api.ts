import axios from 'axios';
import { getSession } from 'next-auth/react';

const getToken = async () => {
  const session: any = await getSession();
  if (session) {
    return session?.accessToken; // Adjust based on your session structure
  }
  return null;
};

const getRefreshToken = async () => {
  const session: any = await getSession();
  if (session) {
    return session?.refreshToken; // Adjust based on your session structure
  }
  return null;
};

export const atmosApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

atmosApi.interceptors.request.use(
  async config => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

atmosApi.interceptors.response.use(
  async response => response,
  async error => {
    const originalRequest = error.config;
    const refreshtoken = await getRefreshToken();

    if (error.response?.status === 401) {
      originalRequest.headers.Authorization = `Bearer ${refreshtoken}`;
      originalRequest._retry = true;
    }

    return Promise.reject(error);
  },
);
