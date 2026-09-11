"use client";

import { useState, useEffect } from "react";
import { X, CheckCircle2, Mail } from "lucide-react";
import { PhoneCountryInput } from "@/components/ui/phone-country-input";
import { CountrySelect } from "@/components/ui/country-select";
import { DEFAULT_COUNTRY, CountryItem } from "@/lib/countries-data";

interface VehicleInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicleTitle?: string;
  vehicleId?: string;
}

export function VehicleInquiryModal({
  isOpen,
  onClose,
  vehicleTitle,
  vehicleId
}: VehicleInquiryModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    make: "",
    model: "",
    destinationCountry: "Angola",
    message: ""
  });
  const [phoneCountry, setPhoneCountry] = useState<CountryItem>(DEFAULT_COUNTRY);
  const [submitted, setSubmitted] = useState(false);
  const [confirmationId, setConfirmationId] = useState("");

  // Pre-fill make & model if vehicleTitle is provided
  useEffect(() => {
    if (vehicleTitle) {
      const clean = vehicleTitle.replace(/^\([A-Za-z0-9]+\)\s*/, "");
      const parts = clean.trim().split(/\s+/);
      const make = parts[0] || "";
      const model = parts.slice(1).join(" ") || "";
      setFormData(prev => ({
        ...prev,
        make: prev.make || make,
        model: prev.model || model
      }));
    }
  }, [vehicleTitle]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone || !formData.make || !formData.model) return;

    const newInquiryId = `INQ-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmationId(newInquiryId);

    const fullPhone = formData.phone.trim().startsWith("+")
      ? formData.phone.trim()
      : `${phoneCountry.dialCode} ${formData.phone.trim()}`;

    // Save to local storage for prototype persistence
    try {
      const existing = JSON.parse(localStorage.getItem("agtp_inquiries") || "[]");
      const newRecord = {
        id: newInquiryId,
        vehicleId: vehicleId || "general",
        vehicleName: `${formData.make} ${formData.model}`.trim() || vehicleTitle || "General Specification Request",
        fullName: formData.fullName,
        email: formData.email,
        phone: fullPhone,
        make: formData.make,
        model: formData.model,
        exportCountry: formData.destinationCountry,
        message: formData.message,
        createdAt: new Date().toISOString(),
        status: "Pending"
      };
      localStorage.setItem("agtp_inquiries", JSON.stringify([newRecord, ...existing]));
    } catch (err) {
      console.error(err);
    }

    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      make: "",
      model: "",
      destinationCountry: "Angola",
      message: ""
    });
    setPhoneCountry(DEFAULT_COUNTRY);
    onClose();
  };

  const displayPhone = formData.phone.trim().startsWith("+")
    ? formData.phone.trim()
    : `${phoneCountry.dialCode} ${formData.phone.trim()}`;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 sm:p-6 animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-[#0b1329] border border-[#1e2b45] rounded-3xl max-w-4xl w-full p-6 sm:p-8 md:p-10 shadow-2xl relative text-white my-auto overflow-visible">
        {/* Close Circular Button */}
        <button
          type="button"
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 sm:top-7 sm:right-7 w-9 h-9 rounded-full border border-slate-700/80 bg-[#060c1c]/80 text-slate-300 hover:text-white hover:border-slate-500 hover:bg-slate-800 flex items-center justify-center transition-colors z-20"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          /* Submission Confirmation Screen */
          <div className="text-center py-6 sm:py-8 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#4361EE]/15 border border-[#4361EE]/30 text-[#5b7bf7] rounded-full flex items-center justify-center mx-auto shadow-lg shadow-blue-500/20">
              <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Vehicle Inquiry Submitted!
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you! Your quotation request reference is{" "}
                <strong className="text-[#5b7bf7] font-mono">{confirmationId}</strong>. An AGTP Group specialist will contact you shortly.
              </p>
            </div>

            <div className="bg-[#060c1c] border border-[#1e2b45] p-4 sm:p-5 rounded-2xl text-left max-w-lg mx-auto space-y-2.5 text-xs text-slate-300">
              <div className="flex justify-between pb-2 border-b border-slate-800">
                <span className="text-slate-400">Request Reference:</span>
                <strong className="text-[#5b7bf7] font-mono text-sm">{confirmationId}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Full Name:</span>
                <span className="text-white font-semibold">{formData.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Contact Email:</span>
                <span className="text-white font-semibold">{formData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Phone:</span>
                <span className="text-white font-semibold">{displayPhone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Vehicle:</span>
                <span className="text-white font-semibold">{formData.make} {formData.model}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Destination Country:</span>
                <span className="text-white font-semibold">{formData.destinationCountry || "Angola"}</span>
              </div>
              {formData.message && (
                <div className="pt-2 border-t border-slate-800/80">
                  <span className="text-slate-400 block mb-1">Requirements:</span>
                  <p className="text-slate-300 italic">{formData.message}</p>
                </div>
              )}
            </div>

            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Our international vehicle export team will review your requirements and prepare your formal Proforma Invoice.
            </p>

            <div className="pt-2">
              <button
                type="button"
                className="w-full max-w-md font-bold bg-[#4361EE] hover:bg-[#3651D4] text-white py-3.5 rounded-xl uppercase tracking-wider transition-colors shadow-lg shadow-blue-600/25 mx-auto block"
                onClick={handleResetAndClose}
              >
                Done & Return to Showcase
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full">
            {/* Eyebrow Label */}
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#5b7bf7]">
              <span className="w-4 h-[2px] bg-[#4361EE] inline-block" />
              <span>REQUEST A QUOTE</span>
            </div>

            {/* Main Heading */}
            <h2 className="mt-2 sm:mt-2.5 text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
              Send Your Vehicle Inquiry
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-6 sm:mt-8 space-y-5">
              {/* 3-Column Fields Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                {/* Full Name */}
                <div>
                  <label htmlFor="inq-fullname" className="block text-xs font-bold text-slate-200">
                    Full Name *
                  </label>
                  <input
                    id="inq-fullname"
                    required
                    type="text"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="mt-1.5 h-11 sm:h-12 w-full rounded-xl border border-[#1e2b45] bg-[#060c1c] px-4 text-sm text-white placeholder:text-slate-500 focus:border-[#4361EE] focus:outline-none transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="inq-email" className="block text-xs font-bold text-slate-200">
                    Email *
                  </label>
                  <div className="relative mt-1.5">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                    <input
                      id="inq-email"
                      required
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="h-11 sm:h-12 w-full rounded-xl border border-[#1e2b45] bg-[#060c1c] pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-[#4361EE] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Phone (with Country Code) */}
                <div>
                  <PhoneCountryInput
                    id="inq-phone"
                    label="Phone (with Country Code) *"
                    labelClassName="block text-xs font-bold text-slate-200"
                    inputContainerClassName="mt-1.5 flex items-center h-11 sm:h-12 rounded-xl border border-[#1e2b45] bg-[#060c1c] focus-within:border-[#4361EE] transition-colors overflow-hidden"
                    buttonClassName="flex items-center h-full gap-1.5 px-3 bg-[#0a1428] hover:bg-[#111e38] transition-colors border-r border-[#1e2b45] shrink-0 text-white select-none"
                    required
                    placeholder="050 123 4567"
                    defaultCountry={DEFAULT_COUNTRY}
                    value={formData.phone}
                    onChange={(val) => setFormData(prev => ({ ...prev, phone: val }))}
                    onCountryChange={(c) => setPhoneCountry(c)}
                  />
                </div>

                {/* Vehicle Make */}
                <div>
                  <label htmlFor="inq-make" className="block text-xs font-bold text-slate-200">
                    Vehicle Make (e.g., Toyota) *
                  </label>
                  <input
                    id="inq-make"
                    required
                    type="text"
                    placeholder="e.g., Toyota"
                    value={formData.make}
                    onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                    className="mt-1.5 h-11 sm:h-12 w-full rounded-xl border border-[#1e2b45] bg-[#060c1c] px-4 text-sm text-white placeholder:text-slate-500 focus:border-[#4361EE] focus:outline-none transition-colors"
                  />
                </div>

                {/* Vehicle Model */}
                <div>
                  <label htmlFor="inq-model" className="block text-xs font-bold text-slate-200">
                    Vehicle Model (e.g., Hilux, Corolla) *
                  </label>
                  <input
                    id="inq-model"
                    required
                    type="text"
                    placeholder="e.g., Hilux, Corolla"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    className="mt-1.5 h-11 sm:h-12 w-full rounded-xl border border-[#1e2b45] bg-[#060c1c] px-4 text-sm text-white placeholder:text-slate-500 focus:border-[#4361EE] focus:outline-none transition-colors"
                  />
                </div>

                {/* Destination Country */}
                <div>
                  <CountrySelect
                    id="inq-country"
                    label="Destination Country *"
                    labelClassName="block text-xs font-bold text-slate-200"
                    buttonClassName="mt-1.5 w-full h-11 sm:h-12 flex items-center justify-between rounded-xl border border-[#1e2b45] bg-[#060c1c] px-4 text-left text-sm font-medium text-white transition-colors focus:border-[#4361EE] outline-none"
                    required
                    value={formData.destinationCountry}
                    defaultValue="Angola"
                    placeholder="Enter your country"
                    onChange={(val) => setFormData({ ...formData, destinationCountry: val })}
                  />
                </div>

                {/* Specific Questions or Requirements */}
                <div className="md:col-span-3">
                  <label htmlFor="inq-req" className="block text-xs font-bold text-slate-200">
                    Specific Questions or Requirements
                  </label>
                  <textarea
                    id="inq-req"
                    rows={3}
                    placeholder="e.g. I need a Toyota Land Cruiser 300, 2026 model. What is the export price including shipping to Luanda, Angola?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-[#1e2b45] bg-[#060c1c] p-3 sm:p-4 text-sm text-white placeholder:text-slate-500 focus:border-[#4361EE] focus:outline-none resize-none transition-colors"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex items-center justify-start sm:justify-center md:justify-start">
                <button
                  type="submit"
                  className="w-full sm:w-48 h-12 rounded-xl bg-[#4361EE] hover:bg-[#3651D4] text-white font-bold text-sm shadow-lg shadow-blue-600/30 active:scale-[0.98] transition-all flex items-center justify-center"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
