import { NextResponse } from "next/server";
import { z } from "zod";

const eventSchema = z.object({
  event: z.string().min(1),
  pathname: z.string().optional(),
  props: z.record(z.union([z.string(), z.number(), z.boolean()])).optional()
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = eventSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    console.info("landing_event", parsed.data);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
