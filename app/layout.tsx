import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ContentProvider } from "@/lib/content/context";
import { PageLoader } from "@/components/ui/page-loader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: "AGTP GROUP | Quality Cars, Parts, and Global Trading",
  description:
    "From Dubai to your driveway: quality cars, spare parts, construction materials, and trading solutions delivered worldwide.",
  applicationName: "AGTP GROUP",
  keywords: ["AGTP GROUP", "Dubai trading", "automotive spare parts", "vehicle export", "global sourcing"]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${inter.variable} min-h-screen bg-[#0B1F33] font-sans text-white antialiased`}>
        <ContentProvider>
          {children}
          <PageLoader />
        </ContentProvider>
      </body>
    </html>
  );
}


