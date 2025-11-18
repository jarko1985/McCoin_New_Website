import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

// TypeScript declarations for NextAuth
declare module 'next-auth' {
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    needs2FA?: boolean;
  }

  interface Session {
    user: User & { id: string; needs2FA?: boolean };
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    id?: string;
    needs2FA?: boolean;
  }
}

// Check for required environment variables
if (!process.env.NEXTAUTH_SECRET && process.env.NODE_ENV === 'production') {
  // Only warn in production, dev mode can use fallback
  // Using a silent check to avoid exposing configuration in logs
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  debug: process.env.NEXTAUTH_DEBUG === 'true' || process.env.AUTH_DEBUG === 'true',
  basePath: '/api/auth',
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          const email = credentials.email as string;
          const password = credentials.password as string;

          // Call our validation API endpoint from the authorize callback
          const baseUrl =
            process.env.NEXTAUTH_URL ||
            (process.env.NODE_ENV === 'production'
              ? 'https://mc-coin-new-website.vercel.app'
              : 'http://10.10.80.26:3000');

          const response = await fetch(`${baseUrl}/api/check-user-status`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });

          const data = await response.json();

          if (data.error) {
            return null;
          }

          // If validation passed, return user object
          const user = {
            id: email,
            email: email,
            name: email.split('@')[0],
          };

          return user;
        } catch (error) {
          // Don't log sensitive authentication errors
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
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      // Always redirect to the home page after successful login
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
});
