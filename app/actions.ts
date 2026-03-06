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
      message: "Demo requests are temporarily unavailable. Please email info@enroagro.com."
    };
  }

  const resend = new Resend(apiKey);
  const from = process.env.RESEND_FROM ?? "FlockPilot <onboarding@resend.dev>";

  try {
    const { data, error } = await resend.emails.send({
      from,
      to: ["info@enroagro.com"],
      replyTo: parsed.data.email,
      subject: `FlockPilot Demo Request - ${parsed.data.companyName}`,
      text: [
        "New demo request submitted.",
        `Full Name: ${parsed.data.fullName}`,
        `Company/Farm Name: ${parsed.data.companyName}`,
        `Email: ${parsed.data.email}`,
        `Phone Number: ${parsed.data.phoneNumber}`,
        `Number of Birds: ${parsed.data.numberOfBirds}`,
        "Message:",
        parsed.data.message
      ].join("\n")
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
