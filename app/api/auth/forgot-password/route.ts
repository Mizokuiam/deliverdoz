import { NextResponse } from "next/server";
import { dbOperations } from '@/lib/db'
import { generateResetToken } from "@/lib/auth/tokens";
import { sendPasswordResetEmail } from "@/lib/auth/email";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    
    const user = await (await dbOperations.user()).findUnique({
      where: { email }
    });

    if (!user) {
      // Return success even if user doesn't exist for security
      return NextResponse.json(
        { message: "If an account exists, a password reset link has been sent" },
        { status: 200 }
      );
    }

    const token = await generateResetToken(email);
    await sendPasswordResetEmail(email, token);

    return NextResponse.json(
      { message: "Password reset email sent" },
      { status: 200 }
    );
  } catch (error) {
    console.error("[forgot-password]", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}