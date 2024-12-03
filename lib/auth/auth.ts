import NextAuth from "next-auth";
import { authConfig } from "@/app/api/auth/[...nextauth]/auth.config";

export const { auth, handlers: { GET, POST } } = NextAuth(authConfig);

export const getServerAuthSession = auth;