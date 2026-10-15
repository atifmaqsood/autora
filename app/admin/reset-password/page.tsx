"use client";

import { FormEvent, Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, Loader2, LockKeyhole, ShieldCheck } from "lucide-react";

import {
  AuthAlert,
  AuthShell,
  authButtonClass,
  authInputClass
} from "@/components/admin/auth-shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function ResetPasswordForm() {
  const token = useSearchParams().get("token") ?? "";
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("The two passwords don't match.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password })
      });

      if (!response.ok) {
        const body = (await response.json()) as { message?: string };
        setError(body.message ?? "Password reset is unavailable right now.");
        return;
      }

      setDone(true);
    } catch {
      setError("Password reset is unavailable right now.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!token) {
    return (
      <>
        <AuthAlert tone="error">This reset link is incomplete. Please request a new one.</AuthAlert>
        <Link
          href="/admin/forgot-password"
          className="mt-6 inline-flex text-xs font-bold text-blue-700 hover:underline"
        >
          Request a new reset link
        </Link>
      </>
    );
  }

  if (done) {
    return (
      <>
        <AuthAlert tone="success">
          Your password has been reset. Any other signed-in sessions have been signed out.
        </AuthAlert>
        <Link href="/admin/login" className={`${authButtonClass} mt-6`}>
          Sign in with your new password
        </Link>
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {[
        { id: "password", label: "New password", value: password, set: setPassword },
        {
          id: "confirm-password",
          label: "Confirm new password",
          value: confirmPassword,
          set: setConfirmPassword
        }
      ].map((field) => (
        <div key={field.id} className="space-y-2">
          <Label htmlFor={field.id} className="text-xs font-bold text-slate-700">
            {field.label}
          </Label>
          <div className="relative">
            <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400" />
            <Input
              id={field.id}
              type="password"
              autoComplete="new-password"
              value={field.value}
              onChange={(event) => field.set(event.target.value)}
              placeholder="At least 8 characters"
              className={authInputClass}
              minLength={8}
              maxLength={128}
              required
            />
          </div>
        </div>
      ))}

      {error && (
        <AuthAlert tone="error">
          {error}{" "}
          {error.includes("expired") && (
            <Link href="/admin/forgot-password" className="underline">
              Request a new link
            </Link>
          )}
        </AuthAlert>
      )}

      <button type="submit" className={authButtonClass} disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
        {isSubmitting ? "Saving..." : "Set new password"}
      </button>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <AuthShell
      icon={ShieldCheck}
      title="Choose a new password"
      description="Enter a new password for your admin account."
    >
      <Suspense fallback={<Loader2 className="h-5 w-5 animate-spin text-slate-400" />}>
        <ResetPasswordForm />
      </Suspense>
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
