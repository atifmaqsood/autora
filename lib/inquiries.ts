export type InquiryType = "contact" | "vehicle" | "parts";

export interface InquiryPayload {
  type: InquiryType;
  name: string;
  email: string;
  phone?: string;
  country?: string;
  subject?: string;
  message?: string;
  details?: Record<string, string>;
  /** Honeypot value; real visitors leave it empty. */
  website?: string;
}

const fallbackError =
  "We couldn't send your inquiry right now. Please try again or contact us on WhatsApp.";

/** Sends a website inquiry to the team inbox and returns its reference. */
export async function submitInquiry(payload: InquiryPayload): Promise<string> {
  let response: Response;
  try {
    response = await fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
  } catch {
    throw new Error(fallbackError);
  }

  const body = (await response.json().catch(() => ({}))) as {
    reference?: string;
    message?: string;
  };
  if (!response.ok || !body.reference) {
    throw new Error(body.message ?? fallbackError);
  }
  return body.reference;
}

/** Reads the hidden honeypot field from a submitted form. */
export function honeypotValue(form: HTMLFormElement): string | undefined {
  const value = new FormData(form).get("website");
  return typeof value === "string" && value ? value : undefined;
}
