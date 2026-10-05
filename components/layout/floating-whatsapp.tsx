"use client";

import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { useContent } from "@/lib/content/context";

export function FloatingWhatsApp() {
  const { content } = useContent();
  const phone = content?.site?.supportPhone?.replace(/[^0-9]/g, "") || "971585855729";

  return (
    <a
      href={`https://wa.me/${phone}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with AGTP Group on WhatsApp"
      title="Chat on WhatsApp"
      className="fixed right-4 z-[60] flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#25D366] bg-white shadow-[0_8px_28px_rgba(0,0,0,0.35)] transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] sm:right-6"
      style={{ bottom: "calc(1rem + env(safe-area-inset-bottom))" }}
    >
      <WhatsAppIcon className="h-8 w-8" />
    </a>
  );
}
