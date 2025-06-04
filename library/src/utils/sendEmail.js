import nodemailer from "nodemailer";

export async function sendEmail(to, subject, text, html) {
  // Create a test account or replace with real credentials.
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mhmmdbader9@gmail.com",
      pass: "jn7jnAPss4f63QBp6D", // activate 2fa, then create an app password
    },
  });

  // Wrap in an async IIFE so we can use await.
  const info = await transporter.sendMail({
    from: '"Node 10 UMS" <mhmmdbader9@gmail.com>',
    to,
    subject,
    text,// plain‑text body
    html// HTML body
  });

  console.log("Message sent:", info.messageId);
}
