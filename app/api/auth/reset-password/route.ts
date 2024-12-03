import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { dbOperations } from '@/lib/db'
import { verifyResetToken } from "@/lib/auth/tokens";

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json();
    
    const payload = await verifyResetToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 12);
    
    await dbOperations.user.update({
      where: { email: payload.email },
      data: { password: hashedPassword }
    });

    return NextResponse.json(
      { message: "Password updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("[reset-password]", error);
    return NextResponse.json(
      { error: "Failed to reset password" },
      { status: 500 }
    );
  }
}