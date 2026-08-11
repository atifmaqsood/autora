"use client";

import { PageHero } from "@/components/layout/page-hero";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { RevealStagger } from "@/components/ui/scroll-reveal";

export default function LocationsPage() {
  const showrooms = [
    {
      name: "Dubai Central Showroom & Hub",
      city: "Dubai, UAE",
      address: "Al Quoz Industrial Area 3, Dubai, United Arab Emirates",
      phone: "+971 4 000 1234",
      email: "inquiries@agtpgroup.com",
      hours: "Mon - Sat: 9:00 AM - 8:00 PM GST",
      specialty: "Luxury SUVs, Off-Road Expedition Rigs & Armored Vehicles"
    },
    {
      name: "Tokyo Performance Gallery",
      city: "Tokyo, Japan",
      address: "Roppongi Hills Mori Tower, Minato-ku, Tokyo, Japan",
      phone: "+81 3 5000 9988",
      email: "inquiries@agtpgroup.com",
      hours: "Mon - Sat: 10:00 AM - 7:00 PM JST",
      specialty: "JDM Sports Coupes, GT-R Nismo & EV Powertrains"
    },
    {
      name: "London Flagship Store",
      city: "London, United Kingdom",
      address: "Mayfair, Berkeley Square, London, W1J 6BR, UK",
      phone: "+44 20 7946 0123",
      email: "inquiries@agtpgroup.com",
      hours: "Mon - Sat: 9:00 AM - 6:00 PM GMT",
      specialty: "Super Tourers, Rolls-Royce & Bentley Customization"
    },
    {
      name: "Munich Performance Center",
      city: "Munich, Germany",
      address: "Leopoldstraße 120, 80802 München, Germany",
      phone: "+49 89 2018 4400",
      email: "inquiries@agtpgroup.com",
      hours: "Mon - Fri: 8:30 AM - 6:30 PM CET",
      specialty: "Porsche Motorsport, BMW M Division & Audi RS Specs"
    },
    {
      name: "Miami Showcase Hub",
      city: "Miami, FL, USA",
      address: "Brickell Avenue Suite 1800, Miami, FL 33131, USA",
      phone: "+1 305 555 0199",
      email: "inquiries@agtpgroup.com",
      hours: "Mon - Sat: 9:00 AM - 7:00 PM EST",
      specialty: "American Supercharged Muscle, Pickup Trucks & EV Sedans"
    }
  ];

  return (
    <div className="space-y-12 pb-16">
      <PageHero
        badge="GLOBAL SHOWROOM NETWORK"
        title="Showroom & Distribution Hubs"
        subtitle="Visit our physical showroom locations worldwide for vehicle inspection, specification consultation, and VIP presentation."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealStagger staggerDelay={80} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {showrooms.map((hub, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-4 hover:border-amber-500 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-amber-600 uppercase tracking-widest">
                  <span>{hub.city}</span>
                  <span className="bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded">
                    HUB #{idx + 1}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900">
                  {hub.name}
                </h3>

                <div className="space-y-2 text-xs text-slate-600">
                  <p className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>{hub.address}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                    <span className="font-semibold text-slate-900">{hub.phone}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>{hub.email}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>{hub.hours}</span>
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <strong className="text-slate-800 block mb-0.5">Specialty Expertise:</strong>
                {hub.specialty}
              </div>
            </div>
          ))}
        </RevealStagger>
      </div>
    </div>
  );
}


