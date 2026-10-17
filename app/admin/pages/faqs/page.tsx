"use client";
import { FormEvent, useCallback, useEffect, useState } from "react";
import {
  CheckCircle2,
  Eye,
  EyeOff,
  HelpCircle,
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
import type { Faq } from "@/lib/faqs/types";
import { faqCategories } from "@/lib/faqs/types";
const blank = {
  question: "",
  answer: "",
  category: faqCategories[0] as string,
  linkText: "",
  linkUrl: "",
  sortOrder: 1,
  isActive: true,
};
type Draft = typeof blank;
export default function FaqsAdminPage() {
  const [items, setItems] = useState<Faq[]>([]);
  const [draft, setDraft] = useState<Draft>(blank);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/faqs", { cache: "no-store" });
      const body = await response.json();
      if (!response.ok) throw new Error(body.message ?? "Unable to load FAQs.");
      setItems(body);
      if (!editingId)
        setDraft((current) => ({ ...current, sortOrder: body.length + 1 }));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to load FAQs.");
    } finally {
      setLoading(false);
    }
  }, [editingId]);
  useEffect(() => {
    void load();
  }, [load]);
  function reset() {
    setEditingId(null);
    setDraft({ ...blank, sortOrder: items.length + 1 });
  }
  function edit(item: Faq) {
    setEditingId(item.id);
    setDraft({
      question: item.question,
      answer: item.answer,
      category: item.category,
      linkText: item.linkText ?? "",
      linkUrl: item.linkUrl ?? "",
      sortOrder: item.sortOrder,
      isActive: item.isActive,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  async function submit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");
    try {
      const response = await fetch(
        editingId ? `/api/admin/faqs/${editingId}` : "/api/admin/faqs",
        {
          method: editingId ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...draft,
            question: draft.question.trim(),
            answer: draft.answer.trim(),
            linkText: draft.linkText.trim() || null,
            linkUrl: draft.linkUrl.trim() || null,
            sortOrder: Number(draft.sortOrder),
          }),
        },
      );
      const body = await response.json();
      if (!response.ok)
        throw new Error(
          Array.isArray(body.message)
            ? body.message[0]
            : (body.message ?? "Unable to save FAQ."),
        );
      setMessage(
        editingId ? "FAQ updated successfully." : "FAQ added successfully.",
      );
      reset();
      await load();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to save FAQ.");
    } finally {
      setSaving(false);
    }
  }
  async function patch(item: Faq, input: Partial<Faq>) {
    setError("");
    const response = await fetch(`/api/admin/faqs/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const body = await response.json();
    if (!response.ok) {
      setError(
        Array.isArray(body.message)
          ? body.message[0]
          : (body.message ?? "Unable to update FAQ."),
      );
      return;
    }
    setMessage(body.isActive ? "FAQ activated." : "FAQ deactivated.");
    await load();
  }
  async function remove(item: Faq) {
    if (!window.confirm(`Delete “${item.question}”?`)) return;
    const response = await fetch(`/api/admin/faqs/${item.id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const body = await response.json();
      setError(body.message ?? "Unable to delete FAQ.");
      return;
    }
    if (editingId === item.id) reset();
    setMessage("FAQ removed successfully.");
    await load();
  }
  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-12">
      <header className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-end">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-blue-700">
            <HelpCircle className="h-4 w-4" />
            FAQ page content
          </div>
          <h1 className="mt-2 text-3xl font-black text-slate-950">
            FAQ’s Page
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Add, edit, remove and arrange frequently asked questions.
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600">
          {items.length} FAQs configured
        </div>
      </header>
      {(error || message) && (
        <div
          className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold ${error ? "border-red-200 bg-red-50 text-red-700" : "border-emerald-200 bg-emerald-50 text-emerald-700"}`}
        >
          {!error && <CheckCircle2 className="h-4 w-4" />}
          {error || message}
        </div>
      )}
      <form
        onSubmit={submit}
        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-black">
            {editingId ? "Edit FAQ" : "Add FAQ"}
          </h2>
          {editingId && (
            <Button type="button" variant="ghost" size="sm" onClick={reset}>
              <X className="mr-1 h-4 w-4" />
              Cancel
            </Button>
          )}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <Label className="text-xs font-bold">Question</Label>
            <Input
              value={draft.question}
              onChange={(e) => setDraft({ ...draft, question: e.target.value })}
              maxLength={300}
              required
              className="mt-1.5 h-11"
            />
          </div>
          <div className="md:col-span-2">
            <Label className="text-xs font-bold">Answer</Label>
            <textarea
              value={draft.answer}
              onChange={(e) => setDraft({ ...draft, answer: e.target.value })}
              maxLength={5000}
              required
              rows={5}
              className="mt-1.5 w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900"
            />
          </div>
          <div>
            <Label className="text-xs font-bold">Category</Label>
            <select
              value={draft.category}
              onChange={(e) => setDraft({ ...draft, category: e.target.value })}
              className="mt-1.5 h-11 w-full rounded-md border border-slate-200 bg-white px-3 text-sm"
            >
              {faqCategories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </div>
          <div>
            <Label className="text-xs font-bold">Display order</Label>
            <Input
              type="number"
              min={0}
              max={9999}
              value={draft.sortOrder}
              onChange={(e) =>
                setDraft({ ...draft, sortOrder: Number(e.target.value) })
              }
              className="mt-1.5 h-11"
            />
          </div>
          <label className="flex items-center gap-2 text-sm font-semibold">
            <input
              type="checkbox"
              checked={draft.isActive}
              onChange={(e) =>
                setDraft({ ...draft, isActive: e.target.checked })
              }
            />
            Active on FAQ page
          </label>
        </div>
        <Button disabled={saving} className="mt-5 gap-2 bg-slate-950">
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : editingId ? (
            <Save className="h-4 w-4" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
          {saving ? "Saving..." : editingId ? "Save FAQ" : "Add FAQ"}
        </Button>
      </form>
      {loading ? (
        <div className="flex min-h-52 items-center justify-center rounded-2xl bg-white">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <article
              key={item.id}
              className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <button
                type="button"
                onClick={() => void patch(item, { isActive: !item.isActive })}
                className={`absolute right-4 top-4 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-black ${item.isActive ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}
              >
                {item.isActive ? (
                  <Eye className="h-3.5 w-3.5" />
                ) : (
                  <EyeOff className="h-3.5 w-3.5" />
                )}
                {item.isActive ? "Active" : "Inactive"}
              </button>
              <div className="pr-28">
                <p className="text-[10px] font-black uppercase tracking-widest text-blue-700">
                  {item.category} · Order {item.sortOrder}
                </p>
                <h3 className="mt-2 font-black text-slate-900">
                  {item.question}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.answer}
                  {item.linkText && (
                    <span className="font-bold text-blue-700">
                      {" "}
                      {item.linkText}
                    </span>
                  )}
                </p>
              </div>
              <div className="mt-4 flex gap-2 border-t border-slate-100 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => edit(item)}
                >
                  <Pencil className="mr-1 h-3.5 w-3.5" />
                  Edit
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-red-600"
                  onClick={() => void remove(item)}
                >
                  <Trash2 className="mr-1 h-3.5 w-3.5" />
                  Remove
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
