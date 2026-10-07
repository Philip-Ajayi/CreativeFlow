import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, service, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    const senderEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
    const recipientCompanyEmail = process.env.COMPANY_EMAIL || "info@freeflowcreativehub.com";

    // 1. Send notification email to company
    const companyEmailPromise = resend.emails.send({
      from: `Contact Form <${senderEmail}>`,
      to: [recipientCompanyEmail],
      replyTo: email,
      subject: `New Inquiry: ${service || "General Inquiry"} - ${name}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #0c3b2e;">
          <h2>New Contact Form Submission</h2>
          <hr style="border: none; border-top: 1px solid #eee;" />
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Selected Service:</strong> ${service}</p>
          <p><strong>Message:</strong></p>
          <blockquote style="background: #f9f9f9; border-left: 4px solid #0c3b2e; padding: 12px; margin: 0; white-space: pre-wrap;">${message}</blockquote>
        </div>
      `,
    });

    // 2. Send confirmation email to visitor
    const visitorEmailPromise = resend.emails.send({
      from: `Team <${senderEmail}>`,
      to: [email],
      subject: `We've received your inquiry: ${service || "General Inquiry"}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #0c3b2e;">
          <h2>Hi ${name},</h2>
          <p>Thank you for reaching out to us regarding <strong>${service}</strong>.</p>
          <p>We've received your message and our team will review it shortly. You can expect a response within 24–48 working hours.</p>
          <br />
          <p style="font-size: 0.9em; color: #666;"><strong>Summary of your note:</strong></p>
          <blockquote style="background: #f4f4f4; border-left: 3px solid #ccc; padding: 10px; margin: 0; color: #555; white-space: pre-wrap;">${message}</blockquote>
          <br />
          <p>Best regards,<br />The Team</p>
        </div>
      `,
    });

    await Promise.all([companyEmailPromise, visitorEmailPromise]);

    return NextResponse.json({ success: true, message: "Emails dispatched successfully." });
  } catch (error: any) {
    console.error("Resend API Error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
