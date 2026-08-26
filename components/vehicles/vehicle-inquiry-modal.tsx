"use client";

import { useState } from "react";
import { X, Send, CheckCircle2, PhoneCall, ShieldCheck, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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
    phone: "",
    exportCountry: "Export Country",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [confirmationId, setConfirmationId] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

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
      phone: "",
      exportCountry: "Export Country",
      message: ""
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full p-6 md:p-8 shadow-2xl relative">
        <button
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">
              Inquiry Submitted Successfully
            </h3>
            <p className="text-sm text-slate-600 max-w-sm mx-auto">
              Thank you! Your specification request reference is{" "}
              <strong className="text-amber-600 font-mono">{confirmationId}</strong>. An AGTP GROUP specialist will contact you shortly.
            </p>
            <div className="bg-slate-50 p-4 rounded-xl text-xs text-slate-500 border border-slate-200 text-left space-y-1">
              <div><strong>Vehicle:</strong> {vehicleTitle || "General Inquiry"}</div>
              <div><strong>Contact Email:</strong> {formData.email}</div>
              <div><strong>Export Country:</strong> {formData.exportCountry || "Not specified"}</div>
            </div>
            <Button
              variant="default"
              className="w-full font-semibold bg-slate-900 mt-2"
              onClick={handleResetAndClose}
            >
              Done & Return to Showcase
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  Request Vehicle Information
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {vehicleTitle ? `Inquiring about ${vehicleTitle}` : "Official Vehicle Specification Sheet & Logistics"}
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <Label htmlFor="inq-name" className="text-xs">Your Full Name *</Label>
                <Input
                  id="inq-name"
                  required
                  placeholder="e.g. Marcus Vance"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="inq-email" className="text-xs">Email Address *</Label>
                  <Input
                    id="inq-email"
                    type="email"
                    required
                    placeholder="marcus@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1 text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="inq-phone" className="text-xs">Phone / WhatsApp</Label>
                  <Input
                    id="inq-phone"
                    type="tel"
                    placeholder="+971 50 000 0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-1 text-sm"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="inq-country" className="text-xs">Export Country</Label>
                <select
                  id="inq-country"
                  value={formData.exportCountry}
                  onChange={(e) => setFormData({ ...formData, exportCountry: e.target.value })}
                  className="w-full h-10 px-3 mt-1 rounded-md border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none"
                >
                  <option value="Export Country">Export Country</option>
                  <option value="Angola">Angola</option>
                  <option value="Ghana">Ghana</option>
                  <option value="Cameroon">Cameroon</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="Kenya">Kenya</option>
                  <option value="Tanzania">Tanzania</option>
                  <option value="Congo">Congo</option>
                  <option value="Ethiopia">Ethiopia</option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                  <option value="United Arab Emirates">United Arab Emirates</option>
                  <option value="Other Country">Other Country</option>
                </select>
              </div>

              <div>
                <Label htmlFor="inq-msg" className="text-xs">Specific Questions or Requirements</Label>
                <Textarea
                  id="inq-msg"
                  rows={3}
                  placeholder="e.g. I need a Toyota Land Cruiser 300, 2026 model. What is the export price including shipping to Luanda, Angola?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="mt-1 text-sm"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <Button type="button" variant="ghost" onClick={handleResetAndClose} className="text-xs">
                Cancel
              </Button>
              <Button type="submit" variant="primary" className="gap-2 font-semibold text-sm">
                <Send className="w-4 h-4" />
                Submit Specification Request
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}


