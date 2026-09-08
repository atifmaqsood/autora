"use client";

import { useState } from "react";
import { X, CheckCircle2, ArrowRight } from "lucide-react";
import { PhoneCountryInput } from "@/components/ui/phone-country-input";
import { CountrySelect } from "@/components/ui/country-select";

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
    name: "",
    email: "",
    phone: "+244 946 123 456",
    exportCountry: "Angola",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [confirmationId, setConfirmationId] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;

    const newInquiryId = `INQ-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmationId(newInquiryId);

    // Save to local storage for prototype persistence
    try {
      const existing = JSON.parse(localStorage.getItem("agtp_inquiries") || "[]");
      const newRecord = {
        id: newInquiryId,
        vehicleId: vehicleId || "general",
        vehicleName: vehicleTitle || "General Specification Request",
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        exportCountry: formData.exportCountry,
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
      name: "",
      email: "",
      phone: "+244 946 123 456",
      exportCountry: "Angola",
      message: ""
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-[#0b1329] border border-[#1e2b45] rounded-3xl max-w-2xl w-full p-6 sm:p-8 md:p-9 shadow-2xl relative text-white my-auto overflow-visible">
        {/* Close Circular Button */}
        <button
          type="button"
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 sm:top-6 sm:right-6 w-9 h-9 rounded-full border border-slate-700/80 bg-[#060c1c]/80 text-slate-300 hover:text-white hover:border-slate-500 hover:bg-slate-800 flex items-center justify-center transition-colors z-20"
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
                Quotation Request Submitted!
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you! Your quotation request reference is{" "}
                <strong className="text-[#5b7bf7] font-mono">{confirmationId}</strong>. An AGTP Group specialist will contact you shortly.
              </p>
            </div>

            <div className="bg-[#060c1c] border border-[#1e2b45] p-4 sm:p-5 rounded-2xl text-left max-w-md mx-auto space-y-2 text-xs text-slate-300">
              <div className="flex justify-between pb-2 border-b border-slate-800">
                <span className="text-slate-400">Request Reference:</span>
                <strong className="text-[#5b7bf7] font-mono text-sm">{confirmationId}</strong>
              </div>
              {vehicleTitle && (
                <div className="flex justify-between">
                  <span className="text-slate-400">Vehicle:</span>
                  <span className="text-white font-semibold">{vehicleTitle}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-slate-400">Applicant Name:</span>
                <span className="text-white font-semibold">{formData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Contact Email:</span>
                <span className="text-white font-semibold">{formData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Phone:</span>
                <span className="text-white font-semibold">{formData.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Destination Country:</span>
                <span className="text-white font-semibold">{formData.exportCountry || "Angola"}</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Our international vehicle export team will review your requirements and prepare your formal Proforma Invoice.
            </p>

            <div className="pt-2">
              <button
                type="button"
                className="w-full max-w-md font-bold bg-[#4361EE] hover:bg-[#3651D4] text-white py-3 rounded-full uppercase tracking-wider transition-colors shadow-lg shadow-blue-600/25 mx-auto block"
                onClick={handleResetAndClose}
              >
                Done & Return to Showcase
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full">
            {/* Eyebrow Label */}
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-[#5b7bf7]">
              <span className="w-5 h-[2px] bg-[#4361EE] inline-block" />
              <span>GET A QUOTE</span>
            </div>

            {/* Main Heading */}
            <h2 className="mt-2 sm:mt-3 text-2xl sm:text-3xl font-black text-white tracking-tight">
              {vehicleTitle ? `Quote for ${vehicleTitle}` : "Request a Quotation"}
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-5 sm:mt-6 space-y-4 sm:space-y-4.5">
              {/* Row 1: Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label htmlFor="inq-name" className="block text-xs font-bold text-slate-200">
                    Name *
                  </label>
                  <input
                    id="inq-name"
                    required
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1.5 h-11 sm:h-12 w-full rounded-xl border border-[#1e2b45] bg-[#060c1c] px-4 text-sm text-white placeholder:text-slate-500 focus:border-[#4361EE] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="inq-email" className="block text-xs font-bold text-slate-200">
                    Email *
                  </label>
                  <input
                    id="inq-email"
                    required
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1.5 h-11 sm:h-12 w-full rounded-xl border border-[#1e2b45] bg-[#060c1c] px-4 text-sm text-white placeholder:text-slate-500 focus:border-[#4361EE] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: Phone and Country (Angola pre-selected, +244 946 123 456 pre-filled) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <PhoneCountryInput
                    id="inq-phone"
                    label="Phone *"
                    labelClassName="block text-xs font-bold text-slate-200"
                    inputContainerClassName="mt-1.5 flex items-center h-11 sm:h-12 rounded-xl border border-[#1e2b45] bg-[#060c1c] focus-within:border-[#4361EE] transition-colors overflow-hidden"
                    buttonClassName="flex items-center h-full gap-1.5 px-3 bg-[#0a1428] hover:bg-[#111e38] transition-colors border-r border-[#1e2b45] shrink-0 text-white select-none"
                    required
                    value={formData.phone}
                    onChange={(val) => setFormData({ ...formData, phone: val })}
                  />
                </div>

                <div>
                  <CountrySelect
                    id="inq-country"
                    label="Country *"
                    labelClassName="block text-xs font-bold text-slate-200"
                    buttonClassName="mt-1.5 w-full h-11 sm:h-12 flex items-center justify-between rounded-xl border border-[#1e2b45] bg-[#060c1c] px-4 text-left text-sm font-medium text-white transition-colors focus:border-[#4361EE] outline-none"
                    required
                    value={formData.exportCountry}
                    defaultValue="Angola"
                    placeholder="Enter your country"
                    onChange={(val) => setFormData({ ...formData, exportCountry: val })}
                  />
                </div>
              </div>

              {/* Row 3: Specific Questions or Requirements */}
              <div>
                <label htmlFor="inq-msg" className="block text-xs font-bold text-slate-200">
                  Specific Questions or Requirements
                </label>
                <textarea
                  id="inq-msg"
                  rows={4}
                  placeholder="Write your requirements here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-[#1e2b45] bg-[#060c1c] p-3 sm:p-4 text-sm text-white placeholder:text-slate-500 focus:border-[#4361EE] focus:outline-none resize-none transition-colors"
                />
              </div>

              {/* Row 4: Submit Button - No hover scale to prevent scrollbar trigger */}
              <div className="pt-2 pb-1 flex items-center justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-[#4361EE] hover:bg-[#3651D4] px-8 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 active:scale-[0.98] transition-all"
                >
                  <span>Get a Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
