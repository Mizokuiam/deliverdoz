import { AuthOptions } from "next-auth";
import { providers } from "./providers";
import { callbacks } from "./callbacks";
import { SESSION_CONFIG } from "./constants";

export const authConfig: AuthOptions = {
  providers,
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  callbacks,
  session: {
    strategy: "jwt",
    maxAge: SESSION_CONFIG.maxAge,
    updateAge: SESSION_CONFIG.updateAge,
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
  events: {
    async signIn({ user }) {
      console.log("[auth] User signed in:", user.email);
    },
    async signOut({ token }) {
      console.log("[auth] User signed out:", token.email);
    },
    async error(error) {
      console.error("[auth] Error:", error);
    },
  },
};