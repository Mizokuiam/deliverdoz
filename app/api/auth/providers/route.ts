import { NextResponse } from "next/server";
import { providers } from "@/lib/auth/providers";
import { AUTH_ERRORS } from "@/lib/auth/constants";

export async function GET() {
  try {
    const availableProviders = providers.map(provider => ({
      id: provider.id,
      name: provider.name,
      type: provider.type,
    }));

    return NextResponse.json(availableProviders, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("[providers] Error:", error);
    return NextResponse.json(
      { error: AUTH_ERRORS.FETCH_ERROR },
      { 
        status: 500,
        headers: {
          "Cache-Control": "no-store, max-age=0",
          "Content-Type": "application/json",
        },
      }
    );
  }
}