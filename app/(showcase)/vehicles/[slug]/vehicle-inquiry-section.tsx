"use client";

import { useState } from "react";
import { PhoneCall, FileText, Download, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VehicleInquiryModal } from "@/components/vehicles/vehicle-inquiry-modal";

interface VehicleInquirySectionProps {
  vehicleId: string;
  vehicleTitle: string;
}

export function VehicleInquirySection({
  vehicleId,
  vehicleTitle
}: VehicleInquirySectionProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownloadSpecSheet = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 4000);
  };

  return (
    <>
      <div className="bg-slate-900 text-white p-5 rounded-xl border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            SHOWCASE INQUIRY & ACTION
          </span>
          <span className="text-[10px] text-slate-400">FRONTEND DEMO</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button
            variant="primary"
            className="w-full font-bold text-xs gap-2 py-3"
            onClick={() => setModalOpen(true)}
          >
            <PhoneCall className="w-4 h-4" />
            Request Information
          </Button>

          <Button
            variant="outline"
            className="w-full font-semibold text-xs gap-2 bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700 hover:text-white"
            onClick={handleDownloadSpecSheet}
          >
            {downloaded ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Spec Sheet Downloaded!
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-amber-400" />
                Download Spec PDF
              </>
            )}
          </Button>
        </div>

        <p className="text-[11px] text-slate-400 leading-tight text-center pt-1">
          Non-ecommerce showcase: Submit an inquiry to receive official factory specification matrix & showroom viewing appointments.
        </p>
      </div>

      <VehicleInquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        vehicleId={vehicleId}
        vehicleTitle={vehicleTitle}
      />
    </>
  );
}

