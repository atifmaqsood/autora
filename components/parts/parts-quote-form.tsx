"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { PhoneCountryInput } from "@/components/ui/phone-country-input";
import { CountrySelect } from "@/components/ui/country-select";
import { HoneypotField } from "@/components/ui/honeypot-field";
import { RevealButton, RevealEyebrow, RevealHeading, RevealText } from "@/components/ui/scroll-reveal";
import { DEFAULT_COUNTRY } from "@/lib/countries-data";
import { honeypotValue, submitInquiry } from "@/lib/inquiries";

const inputClass = "mt-1.5 h-12 w-full rounded-xl border border-white/10 bg-black/20 px-4 text-sm text-white placeholder:text-slate-500 focus:border-[var(--agtp-secondary)] focus:outline-none";
const labelClass = "block text-xs font-bold text-slate-200";

export function PartsQuoteForm({ category, slug, vehicle }: { category: string; slug: string; vehicle?: { id: string; make: string; model: string } }) {
  const [phone, setPhone] = useState("");
  const [phoneCountry, setPhoneCountry] = useState(DEFAULT_COUNTRY);
  const [destination, setDestination] = useState(DEFAULT_COUNTRY.name);
  const [reference, setReference] = useState("");
  const [error, setError] = useState("");
  const [isSending, setIsSending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = event.currentTarget;
    const data = new FormData(form);
    const fullName = String(data.get("fullName") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const make = String(data.get("make") ?? "").trim();
    const model = String(data.get("model") ?? "").trim();
    if (!fullName || !email || !make || !model || !phone.trim() || !destination) {
      setError("Please complete all required fields.");
      return;
    }
    setIsSending(true);
    try {
      const id = await submitInquiry({
        type: vehicle ? "vehicle" : "parts",
        name: fullName,
        email,
        phone: phone.trim().startsWith("+") ? phone.trim() : `${phoneCountry.dialCode} ${phone.trim()}`,
        country: destination,
        subject: `${category} — ${make} ${model}`,
        message: String(data.get("message") ?? "").trim(),
        details: {
          category,
          make,
          model,
          ...(vehicle ? { vehicleId: vehicle.id } : { partsPage: slug }),
          page: window.location.href
        },
        website: honeypotValue(form)
      });
      setReference(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsSending(false);
    }
  }

  return (
    <section id="request-quote" tabIndex={-1} aria-labelledby="quote-heading" className="scroll-mt-44 rounded-3xl border border-white/10 bg-[#0B1F33] p-6 outline-none sm:p-8 md:p-10">
      <RevealEyebrow>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--agtp-secondary)]">Request a quote</p>
      </RevealEyebrow>
      <RevealHeading>
        <h2 id="quote-heading" className="mt-3 text-2xl font-black tracking-tight sm:text-4xl">Send Your {vehicle ? "Vehicle" : "Parts"} Inquiry</h2>
      </RevealHeading>
      <RevealText>
        <p className="mt-3 text-sm text-slate-400">{category} — tell us what you need and where it needs to go.</p>
      </RevealText>
      {reference ? (
        <div role="status" className="mt-8 space-y-4 rounded-2xl border border-white/10 bg-black/20 p-6">
          <CheckCircle2 className="h-9 w-9 text-[var(--agtp-secondary)]" />
          <h3 className="text-xl font-bold">Your quote request has been sent.</h3>
          <p className="break-all text-sm text-slate-300">Reference: {reference}</p>
          <button type="button" onClick={() => setReference("")} className="text-sm font-bold text-[var(--agtp-secondary)] underline underline-offset-4">Send another inquiry</button>
        </div>
      ) : (
        <form onSubmit={submit} className="relative mt-8 space-y-6">
          <HoneypotField />
          <RevealText className="grid gap-5 md:grid-cols-3">
            <div>
              <label htmlFor="parts-fullname" className={labelClass}>Full Name *</label>
              <input id="parts-fullname" name="fullName" autoComplete="name" required placeholder="Full Name" className={inputClass} />
            </div>
            <div>
              <label htmlFor="parts-email" className={labelClass}>Email *</label>
              <input id="parts-email" name="email" type="email" autoComplete="email" required placeholder="Email" className={inputClass} />
            </div>
            <PhoneCountryInput
              id="parts-phone" required value={phone} onChange={setPhone} onCountryChange={setPhoneCountry}
              labelClassName={labelClass}
              inputContainerClassName="mt-1.5 flex h-12 items-center overflow-hidden rounded-xl border border-white/10 bg-black/20 focus-within:border-[var(--agtp-secondary)]"
            />
            <div>
              <label htmlFor="parts-make" className={labelClass}>Vehicle Make *</label>
              <input id="parts-make" name="make" required defaultValue={vehicle?.make} placeholder="e.g., Toyota" className={inputClass} />
            </div>
            <div>
              <label htmlFor="parts-model" className={labelClass}>Vehicle Model *</label>
              <input id="parts-model" name="model" required defaultValue={vehicle?.model} placeholder="e.g., Hilux, Corolla" className={inputClass} />
            </div>
            <CountrySelect id="parts-country" label="Destination Country *" required value={destination} onChange={setDestination} labelClassName={labelClass} buttonClassName={`${inputClass} flex items-center justify-between text-left`} />
            <div className="md:col-span-3">
              <label htmlFor="parts-requirements" className={labelClass}>Specific Questions or Requirements</label>
              <textarea id="parts-requirements" name="message" rows={4} placeholder={vehicle ? "Destination, quantity, preferred specifications, or any other requirements…" : "Part numbers, quantities, vehicle year, or any other requirements…"} className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-white placeholder:text-slate-500 focus:border-[var(--agtp-secondary)] focus:outline-none" />
            </div>
          </RevealText>
          {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
          <RevealButton>
            <button type="submit" disabled={isSending} className="inline-flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-[var(--agtp-secondary)] px-8 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">{isSending ? "Sending..." : "Submit"} <ArrowRight className="h-4 w-4" /></button>
          </RevealButton>
        </form>
      )}
    </section>
  );
}
