import { NextAuthOptions } from 'next-auth';
import { UserRole } from '@/types/auth';
import GoogleProvider from "next-auth/providers/google";

export const authConfig: NextAuthOptions = {
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub as string;
        
        // Safely assign the role with validation
        const allowedRoles: UserRole[] = ['SENDER', 'TRAVELER'];
        const role = allowedRoles.includes(token.role as UserRole)
          ? (token.role as UserRole)
          : 'SENDER'; // Fallback to default role

        session.user.role = role;
      }
      return session;
    },
  },
  // Add your authentication providers here
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
};

export default authConfig;