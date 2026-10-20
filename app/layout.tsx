import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { ContentProvider } from "@/lib/content/context";
import { PageLoader } from "@/components/ui/page-loader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans"
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora"
});

export const metadata: Metadata = {
  title: "AGTP GROUP | Quality Cars, Parts, and Global Trading",
  description:
    "From Dubai to your driveway: quality cars, spare parts, construction materials, and trading solutions delivered worldwide.",
  applicationName: "AGTP GROUP",
  keywords: ["AGTP GROUP", "Dubai trading", "automotive spare parts", "vehicle export", "global sourcing"],
  // Files in public/fav icons (the space is URL-encoded).
  icons: {
    icon: [
      { url: "/fav%20icons/favicon.ico", sizes: "any" },
      { url: "/fav%20icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/fav%20icons/favicon-16x16.png", sizes: "16x16", type: "image/png" }
    ],
    apple: [{ url: "/fav%20icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${inter.variable} ${sora.variable} min-h-screen bg-[#0B1F33] font-sans text-white antialiased`}>
        <ContentProvider>
          {children}
          <PageLoader />
        </ContentProvider>
      </body>
    </html>
  );
}


