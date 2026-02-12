import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const getMissingEnvVars = () => {
  const required = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "MAIL_TO"];
  return required.filter((key) => !process.env[key]);
};

const sanitize = (value: unknown) => (typeof value === "string" ? value.trim() : "");
const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const validatePayload = (payload: ContactPayload) => {
  if (!payload.name || payload.name.length > 120) {
    return "Please provide a valid name.";
  }

  if (!payload.subject || payload.subject.length > 160) {
    return "Please provide a valid subject.";
  }

  if (!payload.message || payload.message.length > 5000) {
    return "Please provide a valid message.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(payload.email) || payload.email.length > 254) {
    return "Please provide a valid email address.";
  }

  return null;
};

export async function POST(request: Request) {
  const missingEnv = getMissingEnvVars();
  if (missingEnv.length) {
    return NextResponse.json(
      { error: `Missing mail configuration: ${missingEnv.join(", ")}` },
      { status: 500 }
    );
  }

  let body: ContactPayload;
  try {
    const data = (await request.json()) as Partial<ContactPayload>;
    body = {
      name: sanitize(data.name),
      email: sanitize(data.email),
      subject: sanitize(data.subject),
      message: sanitize(data.message),
    };
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const validationError = validatePayload(body);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.verify();

    const fromAddress = process.env.MAIL_FROM || process.env.SMTP_USER!;
    const toAddress = process.env.MAIL_TO!;
    const name = escapeHtml(body.name);
    const email = escapeHtml(body.email);
    const subject = escapeHtml(body.subject);
    const message = escapeHtml(body.message).replace(/\n/g, "<br/>");

    await transporter.sendMail({
      from: fromAddress,
      to: toAddress,
      replyTo: body.email,
      subject: `Portfolio contact: ${body.subject}`,
      text: [
        `Name: ${body.name}`,
        `Email: ${body.email}`,
        "",
        "Message:",
        body.message,
      ].join("\n"),
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to send contact mail", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
