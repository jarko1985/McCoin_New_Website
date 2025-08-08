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
if (!process.env.NEXTAUTH_SECRET) {
  console.warn('NEXTAUTH_SECRET not set, using fallback');
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  debug: process.env.NODE_ENV === 'development',
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
          console.log('NextAuth authorize called with:', credentials?.email);

          if (!credentials?.email || !credentials?.password) {
            console.log('Missing credentials');
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
          console.log('Validation API response:', data);

          if (data.error) {
            console.log('Validation failed:', data.error);
            return null;
          }

          // If validation passed, return user object
          const user = {
            id: email,
            email: email,
            name: email.split('@')[0],
          };

          console.log('NextAuth authorize returning user:', user);
          return user;
        } catch (error) {
          console.error('NextAuth authorize error:', error);
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
