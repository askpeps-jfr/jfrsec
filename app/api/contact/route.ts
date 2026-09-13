import { NextResponse } from "next/server";
import { Resend } from "resend";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
};

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  const { name, email, message } = body;

  if (!email || !message) {
    return NextResponse.json(
      { success: false, error: "Email and message are required." },
      { status: 400 }
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: "JFRSec Terminal <onboarding@resend.dev>",
      to: ["askpeps@gmail.com"],
      replyTo: email,
      subject: `JFRSec Transmission from ${name || email}`,
      text: [
        `Operator: ${name || "Unknown"}`,
        `Return address: ${email}`,
        "",
        "Payload:",
        message,
      ].join("\n"),
    });

    if (error) {
      console.error("Resend send error:", error);
      return NextResponse.json(
        { success: false, error: "Failed to send message." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to send message." },
      { status: 500 }
    );
  }
}
