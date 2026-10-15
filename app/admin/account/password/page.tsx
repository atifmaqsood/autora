"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, KeyRound, Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const emptyForm = { currentPassword: "", newPassword: "", confirmPassword: "" };

const fields = [
  { id: "currentPassword", label: "Current password", autoComplete: "current-password" },
  { id: "newPassword", label: "New password", autoComplete: "new-password" },
  { id: "confirmPassword", label: "Confirm new password", autoComplete: "new-password" }
] as const;

export default function ChangePasswordPage() {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (form.newPassword !== form.confirmPassword) {
      setError("The new passwords don't match.");
      return;
    }
    if (form.newPassword === form.currentPassword) {
      setError("Choose a password different from your current one.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: form.currentPassword,
          newPassword: form.newPassword
        })
      });
      const body = (await response.json()) as { message?: string };

      if (response.status === 401) {
        window.location.assign("/admin/login");
        return;
      }
      if (!response.ok) {
        setError(body.message ?? "Password service is unavailable right now.");
        return;
      }

      setForm(emptyForm);
      setMessage("Password updated. Other signed-in sessions have been signed out.");
    } catch {
      setError("Password service is unavailable right now.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 pb-12">
      <header className="border-b border-slate-200 pb-5">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-blue-700">
          <KeyRound className="h-4 w-4" />
          Account security
        </div>
        <h1 className="mt-2 text-3xl font-black text-slate-950">Change Password</h1>
        <p className="mt-2 text-sm text-slate-500">
          Update the password you use to sign in to the admin panel.
        </p>
      </header>

      {(error || message) && (
        <div
          role={error ? "alert" : "status"}
          className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold ${error ? "border-red-200 bg-red-50 text-red-700" : "border-emerald-200 bg-emerald-50 text-emerald-700"}`}
        >
          {!error && <CheckCircle2 className="h-4 w-4" />}
          {error || message}
        </div>
      )}

      <form
        onSubmit={submit}
        className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
      >
        {fields.map((field) => (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className="text-xs font-bold text-slate-700">
              {field.label}
            </Label>
            <Input
              id={field.id}
              type="password"
              autoComplete={field.autoComplete}
              value={form[field.id]}
              onChange={(event) => setForm({ ...form, [field.id]: event.target.value })}
              minLength={field.id === "currentPassword" ? 1 : 8}
              maxLength={128}
              required
            />
          </div>
        ))}
        <p className="text-xs text-slate-500">Use at least 8 characters.</p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {isSubmitting ? "Updating..." : "Update password"}
        </button>
      </form>
    </div>
  );
}
