import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ContentProvider } from "@/lib/content/context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: "Autora — Certified Vehicle Specifications & Global Automotive Showcase",
  description:
    "Explore exhaustive technical specs, engine horsepower, dimensions, and certified options across luxury, sports, SUV, and commercial vehicles.",
  applicationName: "Autora",
  keywords: ["autora", "automotive showcase", "vehicle specifications", "car catalog", "luxury vehicles"]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased min-h-screen bg-slate-50 text-slate-900`}
      >
        <ContentProvider>{children}</ContentProvider>
      </body>
    </html>
  );
}
