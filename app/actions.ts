"use server";

import { Resend } from "resend";
import { z } from "zod";

export type DemoFormState = {
  ok: boolean;
  message: string;
  errors?: Record<string, string>;
};

const demoSchema = z.object({
  fullName: z.string().trim().min(2, "Full name is required."),
  companyName: z.string().trim().min(2, "Company or farm name is required."),
  email: z.string().trim().email("Enter a valid email address."),
  phoneNumber: z.string().trim().min(7, "Phone number is required."),
  numberOfBirds: z.enum([
    "Under 500",
    "500–2,000",
    "2,000–10,000",
    "10,000–50,000",
    "50,000+"
  ]),
  message: z.string().trim().min(10, "Message should be at least 10 characters.")
});

const initialState: DemoFormState = {
  ok: false,
  message: ""
};

type DemoRequestPayload = z.infer<typeof demoSchema>;

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildDemoRequestEmail(payload: DemoRequestPayload): { html: string; text: string } {
  const submittedAt = new Date().toISOString();
  const fields: Array<[label: string, value: string]> = [
    ["Full Name", payload.fullName],
    ["Company/Farm Name", payload.companyName],
    ["Email", payload.email],
    ["Phone Number", payload.phoneNumber],
    ["Number of Birds", payload.numberOfBirds],
    ["Submitted At (UTC)", submittedAt]
  ];

  const text = [
    "New FlockPilot demo request submitted.",
    "",
    ...fields.map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    payload.message
  ].join("\n");

  const rows = fields
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding: 10px 12px; border-bottom: 1px solid #e6eadf; width: 220px; font-weight: 600; color: #2a332c;">${escapeHtml(label)}</td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #e6eadf; color: #111827;">${escapeHtml(value)}</td>
        </tr>
      `
    )
    .join("");

  const html = `
    <div style="margin:0; padding:24px; background:#0f1712; font-family:Arial, Helvetica, sans-serif;">
      <table role="presentation" cellspacing="0" cellpadding="0" width="100%" style="max-width:760px; margin:0 auto; border:1px solid #2f4a1d; border-radius:14px; overflow:hidden; background:#f7f9f4;">
        <tr>
          <td style="padding:20px 24px; background:linear-gradient(90deg, #1d2a21 0%, #223329 100%); color:#ffffff;">
            <div style="font-size:26px; font-weight:800; letter-spacing:0.02em; color:#f0e000;">FlockPilot</div>
            <div style="margin-top:6px; font-size:12px; text-transform:uppercase; letter-spacing:0.08em; color:#d6dfcd;">New Demo Request</div>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 24px 8px; color:#111827; font-size:15px; line-height:1.6;">
            A new demo request has been submitted through the landing page.
          </td>
        </tr>
        <tr>
          <td style="padding:0 24px 20px;">
            <table role="presentation" cellspacing="0" cellpadding="0" width="100%" style="border:1px solid #d6dfcd; border-radius:10px; background:#ffffff;">
              ${rows}
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:0 24px 8px; color:#2a332c; font-size:13px; text-transform:uppercase; letter-spacing:0.08em; font-weight:700;">Message</td>
        </tr>
        <tr>
          <td style="padding:0 24px 24px;">
            <div style="border:1px solid #d6dfcd; border-radius:10px; background:#ffffff; padding:14px; color:#111827; font-size:15px; line-height:1.6; white-space:pre-wrap;">${escapeHtml(payload.message)}</div>
          </td>
        </tr>
      </table>
    </div>
  `.trim();

  return { html, text };
}

export async function requestDemoAction(
  prevState: DemoFormState = initialState,
  formData: FormData
): Promise<DemoFormState> {
  void prevState;
  const parsed = demoSchema.safeParse({
    fullName: formData.get("fullName"),
    companyName: formData.get("companyName"),
    email: formData.get("email"),
    phoneNumber: formData.get("phoneNumber"),
    numberOfBirds: formData.get("numberOfBirds"),
    message: formData.get("message")
  });

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    return {
      ok: false,
      message: "Please correct the highlighted fields and try again.",
      errors: Object.fromEntries(
        Object.entries(errors)
          .filter(([, value]) => value && value[0])
          .map(([key, value]) => [key, value![0]])
      )
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      ok: false,
      message: "Demo requests are temporarily unavailable. Please email info@flockpilot.com."
    };
  }

  const resend = new Resend(apiKey);
  const from = process.env.RESEND_FROM ?? "FlockPilot <onboarding@resend.dev>";
  const { html, text } = buildDemoRequestEmail(parsed.data);

  try {
    const { data, error } = await resend.emails.send({
      from,
      to: ["info@flockpilot.com"],
      replyTo: parsed.data.email,
      subject: `FlockPilot Demo Request - ${parsed.data.companyName}`,
      html,
      text
    });

    if (error) {
      console.error("resend_send_error", { error });
      return {
        ok: false,
        message: "We could not send your request right now. Please try again shortly."
      };
    }

    console.info("demo_request_sent", { emailId: data?.id, email: parsed.data.email });

    return {
      ok: true,
      message:
        "Request sent successfully. Our team will contact you at the email or phone number you provided."
    };
  } catch (error) {
    console.error("demo_request_unexpected_error", { error });
    return {
      ok: false,
      message: "An unexpected error occurred while sending your request. Please try again."
    };
  }
}
