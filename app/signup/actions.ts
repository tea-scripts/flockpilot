"use server";

import { z } from "zod";

const API_URL = process.env.FLOCKPILOT_API_URL || "https://api.internal.enroagro.com/api";

const signupSchema = z.object({
  organizationName: z.string().trim().min(2, "Organization name is required (min 2 characters)."),
  firstName: z.string().trim().min(1, "First name is required."),
  lastName: z.string().trim().min(1, "Last name is required."),
  email: z.string().trim().email("Enter a valid email address."),
  planCode: z.string().optional(),
  trial: z.string().optional(),
});

export type SignupState = {
  ok: boolean;
  message: string;
  errors?: Record<string, string>;
  checkoutUrl?: string;
};

const initialState: SignupState = { ok: false, message: "" };

export async function signupAction(
  prevState: SignupState = initialState,
  formData: FormData,
): Promise<SignupState> {
  void prevState;

  const parsed = signupSchema.safeParse({
    organizationName: formData.get("organizationName"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    planCode: formData.get("planCode") || undefined,
    trial: formData.get("trial") || undefined,
  });

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    return {
      ok: false,
      message: "Please correct the highlighted fields.",
      errors: Object.fromEntries(
        Object.entries(errors)
          .filter(([, v]) => v && v[0])
          .map(([k, v]) => [k, v![0]]),
      ),
    };
  }

  // Step 1: Register (creates PENDING tenant)
  const registerRes = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(parsed.data),
  });

  if (!registerRes.ok) {
    const body = await registerRes.json().catch(() => ({ message: "Registration failed" }));
    return { ok: false, message: body.message || "Registration failed. Please try again." };
  }

  const { tenantId, userId, email } = (await registerRes.json()) as {
    tenantId: string;
    userId: string;
    email: string;
    slug: string;
  };

  // Step 2a: If trial, provision 7-day trial immediately
  if (parsed.data.trial === "1") {
    const trialRes = await fetch(`${API_URL}/billing/provision-trial`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tenantId }),
    });

    if (!trialRes.ok) {
      return {
        ok: true,
        message: "Account created but trial setup failed. Please contact support at info@enroagro.com.",
      };
    }

    return {
      ok: true,
      message: "Your 7-day free trial is active! Check your email for login credentials.",
    };
  }

  // Step 2b: If planCode provided, initiate Paystack checkout
  if (parsed.data.planCode) {
    const checkoutRes = await fetch(`${API_URL}/billing/checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tenantId,
        userId,
        email,
        planCode: parsed.data.planCode,
      }),
    });

    if (!checkoutRes.ok) {
      return {
        ok: true,
        message: "Account created! However, we could not start checkout. Please contact support.",
      };
    }

    const { checkoutUrl } = (await checkoutRes.json()) as { checkoutUrl: string };
    return { ok: true, message: "Redirecting to payment...", checkoutUrl };
  }

  return {
    ok: true,
    message: "Account created! Select a plan below to complete setup.",
  };
}
