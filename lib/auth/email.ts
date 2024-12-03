import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT),
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
  secure: true,
});

export async function sendVerificationEmail(email: string, token: string) {
  const verifyUrl = `${process.env.NEXTAUTH_URL}/auth/verify?token=${token}`;
  
  await transporter.sendMail({
    to: email,
    from: process.env.EMAIL_FROM,
    subject: "Verify your email address",
    text: `Click this link to verify your email: ${verifyUrl}`,
    html: `
      <body>
        <h1>Welcome to DeliverDoz</h1>
        <p>Click the button below to verify your email address:</p>
        <a href="${verifyUrl}" style="background: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 4px;">
          Verify Email Address
        </a>
      </body>
    `,
  });
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`;
  
  await transporter.sendMail({
    to: email,
    from: process.env.EMAIL_FROM,
    subject: "Reset your password",
    text: `Click this link to reset your password: ${resetUrl}`,
    html: `
      <body>
        <h1>Reset Your Password</h1>
        <p>Click the button below to reset your password:</p>
        <a href="${resetUrl}" style="background: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 4px;">
          Reset Password
        </a>
      </body>
    `,
  });
}