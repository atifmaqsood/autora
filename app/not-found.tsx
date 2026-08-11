import Link from "next/link";
import { Car, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4 text-center space-y-6 font-sans">
      <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
        <Car className="w-8 h-8" />
      </div>
      <div className="space-y-2">
        <h1 className="text-4xl font-black">404 — Vehicle Specification Not Found</h1>
        <p className="text-slate-400 text-sm max-w-md mx-auto">
          The requested vehicle model or specification page does not exist or may have been relocated in the showcase catalog.
        </p>
      </div>

      <Link href="/vehicles">
        <Button variant="primary" className="font-bold gap-2 text-sm shadow-lg">
          <ArrowLeft className="w-4 h-4" />
          Return to Vehicle Catalog
        </Button>
      </Link>
    </div>
  );
}


