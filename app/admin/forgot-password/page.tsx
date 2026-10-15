"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowLeft, KeyRound, Loader2, Mail, Send } from "lucide-react";

import {
  AuthAlert,
  AuthShell,
  authButtonClass,
  authInputClass
} from "@/components/admin/auth-shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      if (!response.ok) {
        const body = (await response.json()) as { message?: string };
        setError(body.message ?? "Password reset is unavailable right now.");
        return;
      }

      setSent(true);
    } catch {
      setError("Password reset is unavailable right now.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthShell
      icon={KeyRound}
      title="Forgot password?"
      description="Enter your admin email and we'll send you a link to choose a new password."
    >
      {sent ? (
        <AuthAlert tone="success">
          If {email} belongs to an admin account, a reset link is on its way. The link expires
          in 30 minutes. Check your spam folder if it doesn&apos;t arrive.
        </AuthAlert>
      ) : (
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
                className={authInputClass}
                required
                autoFocus
              />
            </div>
          </div>

          {error && <AuthAlert tone="error">{error}</AuthAlert>}

          <button type="submit" className={authButtonClass} disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            {isSubmitting ? "Sending..." : "Send reset link"}
          </button>
        </form>
      )}

      <Link
        href="/admin/login"
        className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-blue-700 hover:underline"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to sign in
      </Link>
    </AuthShell>
  );
}
