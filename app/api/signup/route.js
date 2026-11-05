import { NextResponse } from "next/server";
import { Resend } from "resend";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  try {
    const { email, source = "landing-page" } = await request.json();
    if (!emailPattern.test(String(email || "").trim())) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY || !process.env.SIGNUP_NOTIFICATION_EMAIL) {
      if (process.env.NODE_ENV === "development") {
        console.info("Glow Gadget signup", { email, source });
        return NextResponse.json({ success: true, demo: true });
      }
      return NextResponse.json({ error: "Signup service is not configured yet." }, { status: 503 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: process.env.SIGNUP_FROM_EMAIL || "Glow Gadget <onboarding@resend.dev>",
      to: process.env.SIGNUP_NOTIFICATION_EMAIL,
      subject: "New Glow Gadget early-access signup",
      text: `Email: ${email}\nSource: ${source}\nSubmitted: ${new Date().toISOString()}`,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "We could not save your email. Please try again." }, { status: 500 });
  }
}
