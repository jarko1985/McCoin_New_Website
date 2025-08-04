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
          // Validate credentials
          if (
            !credentials?.email ||
            typeof credentials.email !== 'string' ||
            !credentials?.password ||
            typeof credentials.password !== 'string'
          ) {
            return null;
          }

          // Use the auth utility to authenticate user (this includes all database logic)
          return await authenticateUser(credentials.email, credentials.password);
        } catch (err: any) {
          console.error('Error in authorize:', err);

          // If it's a verification error, re-throw it so NextAuth can handle it properly
          if (err.message && err.message.includes('verify your email')) {
            throw err;
          }

          // For other errors (database connection, etc.), return null
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
    signIn: '/login',
    error: '/login',
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
