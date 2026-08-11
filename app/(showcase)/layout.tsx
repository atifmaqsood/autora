import { StoreHeader } from "@/components/layout/store-header";
import { StoreFooter } from "@/components/layout/store-footer";
import { CustomCursor } from "@/components/ui/custom-cursor";

export default function ShowcaseLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      <StoreHeader />
      <main className="flex-1">{children}</main>
      <StoreFooter />
      <CustomCursor />
    </div>
  );
}


