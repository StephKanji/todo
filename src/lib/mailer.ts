import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
})

export async function sendVerificationEmail(to: string, name: string, token: string) {
  const url = `${process.env.NEXTAUTH_URL}/auth/verify?token=${token}`
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to,
    subject: '🎮 Verify your GameVault account',
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:auto;background:#06030f;color:#e2e8f0;padding:32px;border-radius:12px;">
        <h1 style="color:#00f5d4;font-size:24px;">Welcome to GameVault, ${name}! 🎮</h1>
        <p style="color:#94a3b8;margin:16px 0;">Click the button below to verify your email and start shopping.</p>
        <a href="${url}" style="display:inline-block;background:#00f5d4;color:#06030f;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:bold;margin:16px 0;">Verify Email →</a>
        <p style="color:#475569;font-size:12px;margin-top:24px;">Link expires in 24 hours.</p>
      </div>`,
  })
}