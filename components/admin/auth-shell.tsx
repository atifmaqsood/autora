import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

import { Logo } from "@/components/layout/logo";

export const authInputClass =
  "h-[52px] rounded-xl border-slate-200 bg-white pl-12 text-[15px] font-medium text-slate-950 shadow-sm outline-none placeholder:font-normal placeholder:text-slate-400 focus-visible:border-blue-600 focus-visible:ring-4 focus-visible:ring-blue-600/10 focus-visible:ring-offset-0";

export const authButtonClass =
  "group flex h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-[#0b1730] px-5 text-sm font-bold text-white shadow-[0_12px_28px_rgba(11,23,48,0.22)] transition hover:bg-[#15294f] focus:outline-none focus:ring-4 focus:ring-blue-600/20 disabled:cursor-not-allowed disabled:opacity-60";

/** Centered card used by the signed-out admin pages (forgot/reset password). */
export function AuthShell({
  icon: Icon,
  title,
  description,
  children
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#07101f] px-4 py-8 sm:px-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-[-22rem] h-[42rem] w-[42rem] rounded-full bg-blue-600/15 blur-3xl" />
        <div className="absolute -bottom-72 right-[-10rem] h-[38rem] w-[38rem] rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      <section className="relative w-full max-w-[480px] rounded-[28px] border border-white/10 bg-[#f8fafc] px-6 py-10 shadow-[0_32px_100px_rgba(0,0,0,0.45)] sm:px-10">
        <div className="mb-8 inline-flex rounded-xl bg-[#0b1730] px-4">
          <Logo isDark className="h-14 w-40" />
        </div>
        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-700">
          <Icon className="h-5 w-5" />
        </div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">Admin portal</p>
        <h1 className="mt-2 text-3xl font-black tracking-[-0.035em] text-slate-950">{title}</h1>
        <p className="mt-3 text-sm leading-6 text-slate-500">{description}</p>
        <div className="mt-8">{children}</div>
      </section>
    </main>
  );
}

export function AuthAlert({ tone, children }: { tone: "error" | "success"; children: ReactNode }) {
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={`rounded-xl border px-4 py-3 text-xs font-semibold ${
        tone === "error"
          ? "border-red-200 bg-red-50 text-red-700"
          : "border-emerald-200 bg-emerald-50 text-emerald-700"
      }`}
    >
      {children}
    </div>
  );
}
