import { NextResponse } from "next/server";
import { Resend } from "resend";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
};

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;

const RECON_SIGNATURE_PATTERNS: RegExp[] = [
  /\bwhoami\b/i,
  /cat\s+\/etc/i,
  /\bsudo\b/i,
  /'\s*or\s*'?1'?\s*=\s*'?1/i,
  /<script/i,
  /eval\s*\(/i,
  /\.\.\//,
  /\bid\b/i,
  /\buname\b/i,
];

const TELEMETRY_ALERT =
  "[!] TELEMETRY ALERT: Payload signature detected and logged. Nice try, analyst.";

function containsReconSignature(...fields: string[]) {
  const combined = fields.join(" ");
  return RECON_SIGNATURE_PATTERNS.some((pattern) => pattern.test(combined));
}

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

  if (
    (name && name.length > MAX_NAME_LENGTH) ||
    email.length > MAX_EMAIL_LENGTH ||
    message.length > MAX_MESSAGE_LENGTH
  ) {
    return NextResponse.json(
      { success: false, error: "Input exceeds maximum allowed length." },
      { status: 400 }
    );
  }

  if (containsReconSignature(name || "", email, message)) {
    console.warn("[contact] recon signature blocked:", { name, email, message });
    return NextResponse.json(
      { success: false, error: TELEMETRY_ALERT },
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
