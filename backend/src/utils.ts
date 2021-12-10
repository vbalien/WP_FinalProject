import nodemailer from "nodemailer";

export async function sendVerifyMail(to: string, token: string) {
  const transporter = nodemailer.createTransport({
    host: "smtp.daum.net",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `"webmaster" <webmaster@alien.moe>`,
    to,
    subject: "web14 프로젝트 인증메일입니다.",
    text: `인증키: ${token}`,
    html: `인증키: <b>${token}</b>`,
  });
}
