import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authenticateUser } from './lib/auth-utils';

// TypeScript declarations for NextAuth
declare module 'next-auth' {
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }

  interface Session {
    user: User & { id: string };
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    id?: string;
  }
}

// Check for required environment variables
if (!process.env.NEXTAUTH_SECRET) {
  console.warn('NEXTAUTH_SECRET not set, using fallback');
}

if (!process.env.MONGODB_URI) {
  console.error('MONGODB_URI is required');
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  debug: process.env.NODE_ENV === 'development',
  basePath: '/api/auth',
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {
          type: 'email',
          label: 'Email',
          placeholder: 'johndoe@gmail.com',
        },
        password: {
          type: 'password',
          label: 'Password',
          placeholder: '*****',
        },
      },
      async authorize(credentials) {
        try {
          console.log('NextAuth authorize called with:', credentials?.email);

          // Validate credentials
          if (
            !credentials?.email ||
            typeof credentials.email !== 'string' ||
            !credentials?.password ||
            typeof credentials.password !== 'string'
          ) {
            console.log('Invalid credentials format');
            return null;
          }

          // Use the auth utility to authenticate user (this includes all database logic)
          const result = await authenticateUser(credentials.email, credentials.password);
          console.log('Auth result type:', typeof result, result ? Object.keys(result) : 'null');

          // Check if we got an error object back
          if (result && typeof result === 'object' && 'error' in result) {
            // For email verification error, return null (failed auth)
            // The error will be handled by checking the URL parameters in the login page
            console.log('Authentication failed:', result.error, result.message);
            return null;
          }

          console.log('Authentication successful for:', credentials.email);
          return result;
        } catch (err: any) {
          console.error('Error in authorize callback:', err);
          // For all errors, return null (failed authentication)
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-for-development-only',
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/en/login',
    error: '/en/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
