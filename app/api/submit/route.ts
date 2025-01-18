import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER,
  port: Number(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, leetcodeLink, alternateFormat } = body;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.NOTIFICATION_EMAIL,
      subject: `New Problem Set Submission from ${name}`,
      html: `
        <h2>New Problem Set Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Description:</strong> ${description}</p>
        <p><strong>LeetCode Link:</strong> <a href="${leetcodeLink}">${leetcodeLink}</a></p>
        ${alternateFormat ? `<p><strong>Alternative Format:</strong> ${alternateFormat}</p>` : ""}
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit problem set" },
      { status: 500 },
    );
  }
}
