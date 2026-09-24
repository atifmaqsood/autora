"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { PhoneCountryInput } from "@/components/ui/phone-country-input";
import { CountrySelect } from "@/components/ui/country-select";
import { DEFAULT_COUNTRY } from "@/lib/countries-data";

const inputClass = "mt-1.5 h-12 w-full rounded-xl border border-white/10 bg-black/20 px-4 text-sm text-white placeholder:text-slate-500 focus:border-[var(--agtp-secondary)] focus:outline-none";
const labelClass = "block text-xs font-bold text-slate-200";

export function PartsQuoteForm({ category, slug }: { category: string; slug: string }) {
  const [phone, setPhone] = useState("");
  const [phoneCountry, setPhoneCountry] = useState(DEFAULT_COUNTRY);
  const [destination, setDestination] = useState(DEFAULT_COUNTRY.name);
  const [reference, setReference] = useState("");
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const data = new FormData(event.currentTarget);
    const fullName = String(data.get("fullName") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const make = String(data.get("make") ?? "").trim();
    const model = String(data.get("model") ?? "").trim();
    if (!fullName || !email || !make || !model || !phone.trim() || !destination) {
      setError("Please complete all required fields.");
      return;
    }
    const id = `INQ-${crypto.randomUUID()}`;
    try {
      const existing = JSON.parse(localStorage.getItem("agtp_inquiries") || "[]");
      if (!Array.isArray(existing)) throw new Error("Invalid inquiry data");
      localStorage.setItem("agtp_inquiries", JSON.stringify([{
        id,
        vehicleId: `parts-${slug}`,
        vehicleName: category,
        name: fullName,
        fullName,
        email,
        phone: phone.trim().startsWith("+") ? phone.trim() : `${phoneCountry.dialCode} ${phone.trim()}`,
        make,
        model,
        exportCountry: destination,
        message: String(data.get("message") ?? "").trim(),
        createdAt: new Date().toISOString(),
        status: "Pending"
      }, ...existing]));
      setReference(id);
    } catch {
      setError("Your request could not be saved. Please try again or contact us on WhatsApp.");
    }
  }

  return (
    <section id="request-quote" tabIndex={-1} aria-labelledby="quote-heading" className="scroll-mt-44 rounded-3xl border border-white/10 bg-[#0B1F33] p-6 outline-none sm:p-8 md:p-10">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--agtp-secondary)]">Request a quote</p>
      <h2 id="quote-heading" className="mt-3 text-2xl font-black tracking-tight sm:text-4xl">Send Your Parts Inquiry</h2>
      <p className="mt-3 text-sm text-slate-400">{category} — tell us what you need and where it needs to go.</p>
      {reference ? (
        <div role="status" className="mt-8 space-y-4 rounded-2xl border border-white/10 bg-black/20 p-6">
          <CheckCircle2 className="h-9 w-9 text-[var(--agtp-secondary)]" />
          <h3 className="text-xl font-bold">Your quote request has been saved.</h3>
          <p className="break-all text-sm text-slate-300">Reference: {reference}</p>
          <button type="button" onClick={() => setReference("")} className="text-sm font-bold text-[var(--agtp-secondary)] underline underline-offset-4">Send another inquiry</button>
        </div>
      ) : (
        <form onSubmit={submit} className="mt-8 space-y-6">
          <div className="grid gap-5 md:grid-cols-3">
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
              <input id="parts-make" name="make" required placeholder="e.g., Toyota" className={inputClass} />
            </div>
            <div>
              <label htmlFor="parts-model" className={labelClass}>Vehicle Model *</label>
              <input id="parts-model" name="model" required placeholder="e.g., Hilux, Corolla" className={inputClass} />
            </div>
            <CountrySelect id="parts-country" label="Destination Country *" required value={destination} onChange={setDestination} labelClassName={labelClass} buttonClassName={`${inputClass} flex items-center justify-between text-left`} />
            <div className="md:col-span-3">
              <label htmlFor="parts-requirements" className={labelClass}>Specific Questions or Requirements</label>
              <textarea id="parts-requirements" name="message" rows={4} placeholder="Part numbers, quantities, vehicle year, or any other requirements…" className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-white placeholder:text-slate-500 focus:border-[var(--agtp-secondary)] focus:outline-none" />
            </div>
          </div>
          {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
          <button type="submit" className="inline-flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-[var(--agtp-secondary)] px-8 text-sm font-bold text-white transition-opacity hover:opacity-90 sm:w-auto">Submit <ArrowRight className="h-4 w-4" /></button>
        </form>
      )}
    </section>
  );
}
