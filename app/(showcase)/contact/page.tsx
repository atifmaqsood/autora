"use client";

import { useState } from "react";
import { PageHero } from "@/components/layout/page-hero";
import { Phone, Mail, MapPin, Send, CheckCircle2, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Vehicle Specification Inquiry",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    try {
      const existing = JSON.parse(localStorage.getItem("autora_inquiries") || "[]");
      const newRecord = {
        id: `INQ-${Math.floor(100000 + Math.random() * 900000)}`,
        vehicleId: "contact-form",
        vehicleName: formData.subject,
        name: formData.name,
        email: formData.email,
        phone: "N/A",
        message: formData.message,
        createdAt: new Date().toISOString(),
        status: "Pending"
      };
      localStorage.setItem("autora_inquiries", JSON.stringify([newRecord, ...existing]));
    } catch (err) {
      console.error(err);
    }

    setSubmitted(true);
  };

  return (
    <div className="space-y-12 pb-16">
      <PageHero
        badge="GET IN TOUCH"
        title="Contact AUTORA Vehicle Showcase"
        subtitle="Have questions about specific vehicle performance matrices, custom export logistics, or showroom viewings? Reach out to our team."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-slate-900">
                  Message Sent Successfully
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Thank you for reaching out to AUTORA Vehicle Showcase. An automotive specialist will review your inquiry and respond within 24 hours.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setSubmitted(false)}
                  className="font-semibold"
                >
                  Send Another Inquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-amber-500" />
                  General Vehicle Inquiry Form
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contact-name" className="text-xs">Full Name *</Label>
                    <Input
                      id="contact-name"
                      required
                      placeholder="e.g. Marcus Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="contact-email" className="text-xs">Email Address *</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="marcus@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="contact-subject" className="text-xs">Inquiry Topic</Label>
                  <select
                    id="contact-subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full h-10 px-3 mt-1 rounded-md border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none"
                  >
                    <option value="Vehicle Specification Inquiry">Vehicle Specification Inquiry</option>
                    <option value="Showroom Appointment Schedule">Showroom Appointment Schedule</option>
                    <option value="Global Export & Logistics Consultation">Global Export & Logistics Consultation</option>
                    <option value="Fleet & Commercial Specification Sheet">Fleet & Commercial Specification Sheet</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="contact-msg" className="text-xs">Message / Specific Inquiry Details *</Label>
                  <Textarea
                    id="contact-msg"
                    required
                    rows={5}
                    placeholder="Provide details about the vehicles, models, or specification sheet comparisons you require..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <Button type="submit" variant="primary" className="w-full font-bold gap-2 text-sm shadow-md">
                  <Send className="w-4 h-4" />
                  Submit Inquiry
                </Button>
              </form>
            )}
          </div>

          {/* Right Column: Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-950 text-white rounded-2xl p-6 md:p-8 border border-slate-800 space-y-6 shadow-xl">
              <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-3">
                Global Headquarters Contact
              </h3>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-1" />
                  <div>
                    <strong className="text-white block">Dubai Central Headquarters</strong>
                    <span className="text-slate-400 text-xs">
                      Al Quoz Industrial Area 3, Dubai, United Arab Emirates
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-amber-500 shrink-0" />
                  <div>
                    <strong className="text-white block">Direct Telephone Hotline</strong>
                    <span className="text-amber-400 text-xs font-semibold">+971 4 000 1234</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-amber-500 shrink-0" />
                  <div>
                    <strong className="text-white block">Inquiry Email</strong>
                    <span className="text-slate-400 text-xs">inquire@autora-motors.com</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-1">
                <strong className="text-amber-400 block mb-1">Showroom Working Hours:</strong>
                <p>Monday – Saturday: 9:00 AM – 8:00 PM GST</p>
                <p>Sunday: Closed (Appointments Only)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
