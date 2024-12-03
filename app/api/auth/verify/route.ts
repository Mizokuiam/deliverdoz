import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyToken } from "@/lib/auth/tokens";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { error: "Missing token" },
        { status: 400 }
      );
    }

    const payload = await verifyToken(token);
    if (!payload?.email) {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 400 }
      );
    }

    await db.user.update({
      where: { email: payload.email },
      data: { emailVerified: new Date() }
    });

    return NextResponse.redirect(new URL("/auth/signin", request.url));
  } catch (error) {
    console.error("[verify]", error);
    return NextResponse.json(
      { error: "Failed to verify email" },
      { status: 500 }
    );
  }
}