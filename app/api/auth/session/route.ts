import { getServerSession } from "@/lib/auth/session";
import { NextResponse } from "next/server";
import { AUTH_ERRORS } from "@/lib/auth/constants";

export async function GET() {
  try {
    const session = await getServerSession();
    
    return NextResponse.json(session || { user: null }, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error("[session] Error:", error);
    return NextResponse.json(
      { error: AUTH_ERRORS.SESSION_ERROR },
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-store, max-age=0',
          'Content-Type': 'application/json',
        },
      }
    );
  }
}