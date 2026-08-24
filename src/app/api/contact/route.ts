import { serviceOptions } from "@/components/service-options";

const VALID_SERVICES = new Set(serviceOptions.map(({ value }) => value));

export async function POST(request: Request) {
  try {
    const body = await request.json();
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

    const supabaseUrl =
      process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SECRET_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return Response.json(
        { error: "The contact form is not configured yet." },
        { status: 500 }
      );
    }

    const response = await fetch(`${supabaseUrl}/rest/v1/contact_messages`, {
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
    });

    if (!response.ok) {
      return Response.json(
        { error: "Unable to save your request. Please try again." },
        { status: 500 }
      );
    }

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
}
