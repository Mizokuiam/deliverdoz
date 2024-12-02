import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import { User as AuthUser } from "next-auth";
import { UserRole } from "@/types";

export const callbacks = {
  async jwt({ token, user }: { token: JWT; user?: AuthUser }) {
    if (user) {
      token.role = (user as AuthUser & { role: UserRole }).role;
    }
    return token;
  },
  async session({ session, token }: { session: Session; token: JWT }) {
    if (session.user) {
      session.user.id = token.sub!;
      session.user.role = token.role as UserRole;
    }
    return session;
  }
};