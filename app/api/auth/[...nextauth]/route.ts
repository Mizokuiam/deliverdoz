import NextAuth from "next-auth";
import authOptions from "./auth.config";
import { AUTH_ERRORS } from "@/lib/auth/constants";
import { dbOperations } from '@/lib/db'

const handler = NextAuth(authOptions);

export async function GET(request: Request) {
  try {
    const response = await handler(request);
    if (!response.ok) {
      throw new Error(`Authentication failed: ${response.statusText}`);
    }
    return response;
  } catch (error) {
    console.error("[auth] GET error:", error);
    return new Response(
      JSON.stringify({ error: AUTH_ERRORS.SERVER_ERROR }),
      { 
        status: 500, 
        headers: { 
          "Content-Type": "application/json",
          "Cache-Control": "no-store, max-age=0"
        } 
      }
    );
  }
}

export async function POST(request: Request) {
  try {
    const response = await handler(request);
    if (!response.ok) {
      throw new Error(`Authentication failed: ${response.statusText}`);
    }
    return response;
  } catch (error) {
    console.error("[auth] POST error:", error);
    return new Response(
      JSON.stringify({ error: AUTH_ERRORS.SERVER_ERROR }),
      { 
        status: 500, 
        headers: { 
          "Content-Type": "application/json",
          "Cache-Control": "no-store, max-age=0"
        } 
      }
    );
  }
}