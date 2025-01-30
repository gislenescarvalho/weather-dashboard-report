import { isEmpty } from 'lodash';
import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';

export const useAuth = () => {
  const { data: session, status } = useSession();

  const isNotAuth = isEmpty(session) && status === 'unauthenticated';

  useEffect(() => {
    if (isNotAuth) {
      signIn('keycloak', { redirect: true, callbackUrl: '/keycloak' });
    }
  }, [session, status, isNotAuth]);

  return {
    isAuthenticated: status === 'authenticated',
  };
};
