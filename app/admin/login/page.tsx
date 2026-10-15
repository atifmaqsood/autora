"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Mail,
  Settings2,
  ShieldCheck
} from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ADMIN_HOME } from "@/lib/auth/constants";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // A client-side middleware redirect can briefly retain the previous admin
    // layout. Force the browser onto the real login URL so the protected shell
    // is never shown around this page.
    if (window.location.pathname !== "/admin/login") {
      const loginUrl = new URL("/admin/login", window.location.origin);
      loginUrl.searchParams.set(
        "from",
        `${window.location.pathname}${window.location.search}`
      );
      window.location.replace(loginUrl.toString());
    }
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const body = (await response.json()) as { message?: string };

      if (!response.ok) {
        setError(body.message ?? "Unable to sign in.");
        return;
      }

      const requestedPath = new URLSearchParams(window.location.search).get("from");
      const destination =
        requestedPath?.startsWith("/admin/") &&
        !requestedPath.startsWith("/admin/login")
          ? requestedPath
          : ADMIN_HOME;

      // A full navigation also clears any stale layout left by an intercepted
      // middleware redirect.
      window.location.replace(destination);
    } catch {
      setError("Authentication service is unavailable.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#07101f] px-4 py-8 sm:px-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-[-22rem] h-[42rem] w-[42rem] rounded-full bg-blue-600/15 blur-3xl" />
        <div className="absolute -bottom-72 right-[-10rem] h-[38rem] w-[38rem] rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:48px_48px]" />
      </div>

      <section className="relative grid w-full max-w-[1080px] overflow-hidden rounded-[32px] border border-white/10 bg-white shadow-[0_32px_100px_rgba(0,0,0,0.45)] lg:min-h-[640px] lg:grid-cols-[0.92fr_1.08fr]">
        <aside className="relative hidden overflow-hidden bg-[#0b1730] p-12 lg:flex lg:flex-col">
          <div className="absolute right-[-9rem] top-[-8rem] h-80 w-80 rounded-full border-[52px] border-blue-500/10" />
          <div className="absolute bottom-[-7rem] left-[-7rem] h-72 w-72 rounded-full bg-blue-500/10 blur-2xl" />

          <Logo isDark className="relative z-10 h-16 w-48" />

          <div className="relative z-10 my-auto py-12">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-400/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-blue-200">
              <ShieldCheck className="h-3.5 w-3.5" />
              Secure administration
            </div>
            <h2 className="max-w-sm text-[40px] font-black leading-[1.08] tracking-[-0.04em] text-white">
              Your website controls, in one focused place.
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">
              Sign in to manage brand identity, contact information, global colors and SEO settings.
            </p>

            <div className="mt-9 space-y-3">
              {["Protected admin access", "Focused site settings", "Secure session management"].map(
                (item) => (
                  <div key={item} className="flex items-center gap-3 text-xs font-semibold text-slate-300">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-400/15 text-blue-300">
                      <Check className="h-3 w-3" />
                    </span>
                    {item}
                  </div>
                )
              )}
            </div>
          </div>

          <p className="relative z-10 text-[11px] text-slate-500">
            AGTP Group · Administration portal
          </p>
        </aside>

        <div className="flex items-center bg-[#f8fafc] px-6 py-10 sm:px-12 lg:px-16">
          <div className="mx-auto w-full max-w-[420px]">
            <div className="mb-9 lg:hidden">
              <div className="inline-flex rounded-xl bg-[#0b1730] px-4">
                <Logo isDark className="h-14 w-40" />
              </div>
            </div>

            <div className="mb-8">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-700">
                <Settings2 className="h-5 w-5" />
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">Admin portal</p>
              <h1 className="mt-2 text-3xl font-black tracking-[-0.035em] text-slate-950 sm:text-4xl">
                Welcome back
              </h1>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                Enter your administrator credentials to continue to site settings.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-bold text-slate-700">
                  Email address
                </Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    autoComplete="username"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="name@company.com"
                    className="h-[52px] rounded-xl border-slate-200 bg-white pl-12 text-[15px] font-medium text-slate-950 shadow-sm outline-none placeholder:font-normal placeholder:text-slate-400 focus-visible:border-blue-600 focus-visible:ring-4 focus-visible:ring-blue-600/10 focus-visible:ring-offset-0"
                    required
                    autoFocus
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-xs font-bold text-slate-700">
                    Password
                  </Label>
                  <Link
                    href="/admin/forgot-password"
                    className="text-[11px] font-bold text-blue-700 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    className="h-[52px] rounded-xl border-slate-200 bg-white px-12 text-[15px] font-medium text-slate-950 shadow-sm outline-none placeholder:font-normal placeholder:text-slate-400 focus-visible:border-blue-600 focus-visible:ring-4 focus-visible:ring-blue-600/10 focus-visible:ring-offset-0"
                    minLength={8}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-[18px] w-[18px]" />
                    ) : (
                      <Eye className="h-[18px] w-[18px]" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-semibold text-red-700"
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="group flex h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-[#0b1730] px-5 text-sm font-bold text-white shadow-[0_12px_28px_rgba(11,23,48,0.22)] transition hover:bg-[#15294f] hover:shadow-[0_14px_32px_rgba(11,23,48,0.28)] focus:outline-none focus:ring-4 focus:ring-blue-600/20 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                )}
                {isSubmitting ? "Signing in..." : "Continue to settings"}
              </button>
            </form>

            <p className="mt-8 text-center text-[11px] leading-5 text-slate-400">
              Authorized administrators only. Your session is encrypted and automatically expires.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
