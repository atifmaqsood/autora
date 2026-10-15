"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  Eye,
  EyeOff,
  Loader2,
  Pencil,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CareerJob } from "@/lib/editorial/types";

const blank = {
  title: "",
  department: "",
  location: "Dubai Headquarters",
  employmentType: "Full-Time",
  description: "",
  responsibilities: "",
  requirements: "",
  applicationEmail: "careers@agtpgroup.com",
  isActive: true,
  sortOrder: 0,
};
type Draft = typeof blank;

export default function CareersAdminPage() {
  const [jobs, setJobs] = useState<CareerJob[]>([]);
  const [draft, setDraft] = useState<Draft>(blank);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const load = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/careers/jobs", {
        cache: "no-store",
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.message ?? "Unable to load jobs.");
      setJobs(body);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to load jobs.");
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    void load();
  }, [load]);
  const set = <K extends keyof Draft>(key: K, value: Draft[K]) =>
    setDraft((current) => ({ ...current, [key]: value }));
  function reset() {
    setEditingId(null);
    setDraft(blank);
  }
  function edit(job: CareerJob) {
    setEditingId(job.id);
    setDraft({
      title: job.title,
      department: job.department,
      location: job.location,
      employmentType: job.employmentType,
      description: job.description,
      responsibilities: job.responsibilities.join("\n"),
      requirements: job.requirements.join("\n"),
      applicationEmail: job.applicationEmail,
      isActive: job.isActive,
      sortOrder: job.sortOrder,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  async function submit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setNotice("");
    try {
      const response = await fetch(
        editingId
          ? `/api/admin/careers/jobs/${editingId}`
          : "/api/admin/careers/jobs",
        {
          method: editingId ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(draft),
        },
      );
      const body = await response.json();
      if (!response.ok)
        throw new Error(
          Array.isArray(body.message)
            ? body.message[0]
            : (body.message ?? "Unable to save job."),
        );
      setNotice(
        editingId ? "Job opportunity updated." : "Job opportunity added.",
      );
      reset();
      await load();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to save job.");
    } finally {
      setSaving(false);
    }
  }
  async function update(job: CareerJob, values: Partial<Draft>) {
    const response = await fetch(`/api/admin/careers/jobs/${job.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const body = await response.json();
    if (!response.ok) {
      setError(body.message ?? "Unable to update job.");
      return;
    }
    setNotice(values.isActive ? "Job activated." : "Job hidden.");
    await load();
  }
  async function remove(job: CareerJob) {
    if (!window.confirm(`Delete “${job.title}”?`)) return;
    const response = await fetch(`/api/admin/careers/jobs/${job.id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const body = await response.json();
      setError(body.message ?? "Unable to delete job.");
      return;
    }
    if (editingId === job.id) reset();
    setNotice("Job opportunity deleted.");
    await load();
  }
  const field = (
    label: string,
    key: keyof Pick<
      Draft,
      | "title"
      | "department"
      | "location"
      | "employmentType"
      | "applicationEmail"
      | "sortOrder"
    >,
    type = "text",
  ) => (
    <div>
      <Label className="text-xs font-bold text-slate-700">{label}</Label>
      <Input
        required
        type={type}
        value={String(draft[key])}
        min={key === "sortOrder" ? 0 : undefined}
        max={key === "sortOrder" ? 999 : undefined}
        onChange={(event) =>
          set(
            key,
            (key === "sortOrder"
              ? Number(event.target.value)
              : event.target.value) as never,
          )
        }
        className="mt-1.5 bg-white text-slate-950"
      />
    </div>
  );
  return (
    <div className="mx-auto max-w-6xl space-y-8 pb-12">
      <header className="border-b border-slate-200 pb-5">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-blue-700">
          <BriefcaseBusiness className="h-4 w-4" />
          Career opportunities
        </div>
        <h1 className="mt-2 text-3xl font-black text-slate-950">
          Careers Page
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Add, edit, order and hide open positions shown on the website.
        </p>
      </header>
      {(error || notice) && (
        <div
          className={`rounded-xl border px-4 py-3 text-sm font-semibold ${error ? "border-red-200 bg-red-50 text-red-700" : "border-emerald-200 bg-emerald-50 text-emerald-700"}`}
        >
          {error || notice}
        </div>
      )}
      <form
        onSubmit={submit}
        className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
      >
        <div className="flex justify-between">
          <h2 className="text-lg font-black text-slate-950">
            {editingId ? "Edit opportunity" : "Add opportunity"}
          </h2>
          {editingId && (
            <Button
              type="button"
              variant="outline"
              onClick={reset}
              className="gap-2"
            >
              <X className="h-4 w-4" />
              Cancel
            </Button>
          )}
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {field("Job title", "title")}
          {field("Department", "department")}
          {field("Location", "location")}
          {field("Employment type", "employmentType")}
          {field("Application email", "applicationEmail", "email")}
          {field("Display order", "sortOrder", "number")}
        </div>
        <div>
          <Label className="text-xs font-bold text-slate-700">
            Role description
          </Label>
          <textarea
            required
            rows={4}
            value={draft.description}
            onChange={(event) => set("description", event.target.value)}
            className="mt-1.5 w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-950"
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label className="text-xs font-bold text-slate-700">
              Responsibilities (one per line)
            </Label>
            <textarea
              required
              rows={7}
              value={draft.responsibilities}
              onChange={(event) => set("responsibilities", event.target.value)}
              className="mt-1.5 w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-950"
            />
          </div>
          <div>
            <Label className="text-xs font-bold text-slate-700">
              Requirements (one per line)
            </Label>
            <textarea
              required
              rows={7}
              value={draft.requirements}
              onChange={(event) => set("requirements", event.target.value)}
              className="mt-1.5 w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-950"
            />
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <input
            type="checkbox"
            checked={draft.isActive}
            onChange={(event) => set("isActive", event.target.checked)}
          />
          Open and visible on website
        </label>
        <Button disabled={saving} className="gap-2 bg-slate-950">
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : editingId ? (
            <Save className="h-4 w-4" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
          {saving
            ? "Saving…"
            : editingId
              ? "Update opportunity"
              : "Add opportunity"}
        </Button>
      </form>
      <section>
        <h2 className="mb-4 text-xl font-black text-slate-950">
          Current opportunities
        </h2>
        {loading ? (
          <Loader2 className="h-6 w-6 animate-spin" />
        ) : (
          <div className="space-y-3">
            {jobs.map((job) => (
              <article
                key={job.id}
                className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-slate-950">{job.title}</h3>
                    <span
                      className={`rounded-full px-2 py-1 text-[10px] font-bold ${job.isActive ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}
                    >
                      {job.isActive ? "Active" : "Hidden"}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    {job.department} · {job.location} · {job.employmentType} ·
                    Order {job.sortOrder}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      void update(job, { isActive: !job.isActive })
                    }
                    className="gap-1"
                  >
                    {job.isActive ? (
                      <EyeOff className="h-3.5 w-3.5" />
                    ) : (
                      <Eye className="h-3.5 w-3.5" />
                    )}
                    {job.isActive ? "Hide" : "Show"}
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => edit(job)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => void remove(job)}
                    className="text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
