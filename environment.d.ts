declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      NEXT_PUBLIC_BASE_URL: string;
      NEXT_PUBLIC_COOKIES_DOMAIN: 'localhost' | '';
      NEXT_PUBLIC_ENVIRONMENT: 'development' | 'staging' | 'production';
    }
  }
}

export {};
