import { after } from "next/server";
import { serviceOptions } from "@/components/service-options";

const VALID_SERVICES = new Set(serviceOptions.map(({ value }) => value));

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const fullName = typeof body.fullName === "string" ? body.fullName.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const postcode = typeof body.postcode === "string" ? body.postcode.trim() : "";
  const service = typeof body.service === "string" ? body.service.trim() : "";
  const description =
    typeof body.description === "string" ? body.description.trim() : "";
  const phoneDigits = phone.replace(/\D/g, "");
  const isAustralianPhone = /^(?:0[23478]\d{8}|61[23478]\d{8})$/.test(
    phoneDigits
  );

  if (
    !fullName ||
    !isAustralianPhone ||
    !email ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !/^\d{4}$/.test(postcode) ||
    !VALID_SERVICES.has(service) ||
    !description ||
    description.length > 2000
  ) {
    return Response.json(
      { error: "Please provide valid contact details." },
      { status: 400 }
    );
  }

  const sheetsWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const sheetsWebhookSecret = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET;

  if (!sheetsWebhookUrl || !sheetsWebhookSecret) {
    return Response.json(
      { error: "The contact form is not configured yet." },
      { status: 500 }
    );
  }

  try {
    const sheetsResponse = await fetch(sheetsWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: sheetsWebhookSecret,
        fullName,
        phone,
        email,
        postcode,
        service,
        description,
      }),
      cache: "no-store",
    });
    const sheetsResult = await sheetsResponse.json().catch(() => null);

    if (!sheetsResponse.ok || sheetsResult?.success !== true) {
      console.error("Google Sheets webhook rejected a contact submission.", {
        status: sheetsResponse.status,
      });
      return Response.json(
        { error: "Unable to save your request. Please try again." },
        { status: 502 }
      );
    }
  } catch (error) {
    console.error("Google Sheets webhook request failed.", error);
    return Response.json(
      { error: "Unable to save your request. Please try again." },
      { status: 502 }
    );
  }

  const supabaseUrl =
    process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SECRET_KEY;

  if (supabaseUrl && supabaseKey) {
    after(async () => {
      try {
        const supabaseResponse = await fetch(
          `${supabaseUrl}/rest/v1/contact_messages`,
          {
            method: "POST",
            headers: {
              apikey: supabaseKey,
              "Content-Type": "application/json",
              Prefer: "return=minimal",
            },
            body: JSON.stringify({
              name: fullName,
              email,
              phone,
              message: `Postcode: ${postcode}\nService: ${service}\nDescription: ${description}`,
            }),
            cache: "no-store",
          }
        );

        if (!supabaseResponse.ok) {
          console.error("Supabase backup rejected a contact submission.", {
            status: supabaseResponse.status,
          });
        }
      } catch (error) {
        console.error("Supabase backup request failed.", error);
      }
    });
  }

  return Response.json({ success: true });
}
