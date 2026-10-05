import { StoreHeader } from "@/components/layout/store-header";
import { StoreFooter } from "@/components/layout/store-footer";
import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";
import { CustomCursor } from "@/components/ui/custom-cursor";

export default function ShowcaseLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#060709] font-sans text-white">
      <StoreHeader />
      <main className="flex-1">{children}</main>
      <StoreFooter />
      <FloatingWhatsApp />
      <CustomCursor />
    </div>
  );
}
