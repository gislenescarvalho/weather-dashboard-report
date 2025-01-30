import { Agent } from 'https';
import NextAuth, { AuthOptions } from 'next-auth';
import KeycloakProvider from 'next-auth/providers/keycloak';
import { signOut } from 'next-auth/react';

const httpsAgent = new Agent({ rejectUnauthorized: false });

async function refreshAccessToken(token: any) {
  try {
    const url = `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.KEYCLOAK_CLIENT_ID,
        client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken,
      } as any),
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000, // Add expiration time
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

export const authOptions: AuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID || '', // Must match Keycloak client ID
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET || '', // Must match Keycloak client secret
      issuer: process.env.KEYCLOAK_ISSUER || '', // Keycloak realm URL
      httpOptions: {
        agent: httpsAgent, // For development with self-signed certs
      },
      authorization: {
        params: {
          scope: 'openid email profile', // Include necessary scopes
        },
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET, // Ensure this is set
  callbacks: {
    async jwt({ token, account, user }: any) {
      if (token.error) {
        return signOut();
      }

      if (account && user) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpires = account.expires_at * 1000; // Convert to ms
      }

      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      return await refreshAccessToken(token);
    },
    async session({ session, token }: any) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.accessTokenExpires = token.accessTokenExpires;

      function reduceThreeHours(msTimestamp: number) {
        const threeHoursInMs = 3 * 60 * 60 * 1000;
        const updatedTimestamp = msTimestamp - threeHoursInMs;
        const updatedDate = new Date(updatedTimestamp);
        return {
          updatedDate,
          updatedTimestamp,
        };
      }

      const newSession = {
        ...session,
        accessTokenExpires: reduceThreeHours(token.accessTokenExpires)
          .updatedTimestamp,
        expires: reduceThreeHours(
          token.accessTokenExpires,
        ).updatedDate.toISOString(),
      };

      return newSession;
    },
    redirect: params => {
      return '/';
    },
  },
  debug: true,
};

export default NextAuth(authOptions);
