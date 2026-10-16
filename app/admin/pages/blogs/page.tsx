"use client";

import Image from "next/image";
import { FormEvent, useCallback, useEffect, useState } from "react";
import {
  Eye,
  EyeOff,
  FileVideo,
  Loader2,
  Newspaper,
  Pencil,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";
import { MarketingPageEditor } from "@/components/admin/marketing-page-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { BlogPost } from "@/lib/editorial/types";
import { agtpAssets } from "@/src/assets";
import { adminFetch } from "@/lib/admin/admin-fetch";
import { RichTextEditor } from "@/components/admin/rich-text-editor";

const builtins: Record<string, string> = {
  "builtin:blog-export-port": agtpAssets.exportPort.src,
  "builtin:blog-spare-parts": agtpAssets.sparePartsHero.src,
  "builtin:blog-about": agtpAssets.aboutHero.src,
};
const blank = {
  title: "",
  category: "AGTP Insights",
  publishedDate: new Date().toISOString().slice(0, 10),
  excerpt: "",
  content: "",
  isActive: true,
};

export default function BlogsAdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [draft, setDraft] = useState(blank);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const response = await adminFetch("/api/admin/blogs", { cache: "no-store" });
      const body = await response.json();
      if (!response.ok)
        throw new Error(body.message ?? "Unable to load blog posts.");
      setPosts(body);
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "Unable to load blog posts.",
      );
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    void load();
  }, [load]);

  function reset() {
    setEditingId(null);
    setDraft(blank);
    setImage(null);
    setVideo(null);
  }
  function edit(post: BlogPost) {
    setEditingId(post.id);
    setDraft({
      title: post.title,
      category: post.category,
      publishedDate: post.publishedDate,
      excerpt: post.excerpt,
      content: post.content,
      isActive: post.isActive,
    });
    setImage(null);
    setVideo(null);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!editingId && !image) {
      setError("A cover image is required for a new blog post.");
      return;
    }
    if (!draft.content.trim()) {
      setError("Article content is required.");
      return;
    }
    setSaving(true);
    setError("");
    setNotice("");
    const data = new FormData();
    Object.entries(draft).forEach(([key, value]) =>
      data.set(key, String(value)),
    );
    if (image) data.set("image", image);
    if (video) data.set("video", video);
    try {
      const response = await adminFetch(
        editingId ? `/api/admin/blogs/${editingId}` : "/api/admin/blogs",
        { method: editingId ? "PATCH" : "POST", body: data },
      );
      const body = await response.json();
      if (!response.ok)
        throw new Error(
          Array.isArray(body.message)
            ? body.message[0]
            : (body.message ?? "Unable to save blog post."),
        );
      setNotice(editingId ? "Blog post updated." : "Blog post added.");
      reset();
      await load();
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "Unable to save blog post.",
      );
    } finally {
      setSaving(false);
    }
  }
  async function patch(post: BlogPost, isActive: boolean) {
    const data = new FormData();
    data.set("isActive", String(isActive));
    const response = await adminFetch(`/api/admin/blogs/${post.id}`, {
      method: "PATCH",
      body: data,
    });
    const body = await response.json();
    if (!response.ok) {
      setError(body.message ?? "Unable to update status.");
      return;
    }
    setNotice(isActive ? "Blog post activated." : "Blog post hidden.");
    await load();
  }
  async function remove(post: BlogPost) {
    if (!window.confirm(`Delete “${post.title}”?`)) return;
    const response = await adminFetch(`/api/admin/blogs/${post.id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const body = await response.json();
      setError(body.message ?? "Unable to delete blog post.");
      return;
    }
    if (editingId === post.id) reset();
    setNotice("Blog post deleted.");
    await load();
  }
  const field = (
    label: string,
    key: "title" | "category" | "publishedDate",
  ) => (
    <div>
      <Label className="text-xs font-bold text-slate-700">{label}</Label>
      <Input
        type={key === "publishedDate" ? "date" : "text"}
        required
        value={draft[key]}
        onChange={(event) =>
          setDraft((current) => ({ ...current, [key]: event.target.value }))
        }
        className="mt-1.5 bg-white text-slate-950"
      />
    </div>
  );

  return (
    <div className="mx-auto max-w-6xl space-y-8 pb-12">
      <header className="border-b border-slate-200 pb-5">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-blue-700">
          <Newspaper className="h-4 w-4" />
          Blog management
        </div>
        <h1 className="mt-2 text-3xl font-black text-slate-950">Blogs Page</h1>
        <p className="mt-2 text-sm text-slate-500">
          Add articles with a cover image, optional video and full content.
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
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-slate-950">
            {editingId ? "Edit blog post" : "Add blog post"}
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
          {field("Title", "title")}
          {field("Category", "category")}
          {field("Published date", "publishedDate")}
        </div>
        <div>
          <Label className="text-xs font-bold text-slate-700">
            Short excerpt
          </Label>
          <textarea
            required
            rows={3}
            value={draft.excerpt}
            onChange={(event) =>
              setDraft((current) => ({
                ...current,
                excerpt: event.target.value,
              }))
            }
            className="mt-1.5 w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-950"
          />
        </div>
        <div>
          <Label className="text-xs font-bold text-slate-700">
            Article content
          </Label>
          <RichTextEditor
            value={draft.content}
            onChange={(content) =>
              setDraft((current) => ({ ...current, content }))
            }
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label className="text-xs font-bold text-slate-700">
              Cover image {editingId ? "(optional replacement)" : "*"}
            </Label>
            <Input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(event) => setImage(event.target.files?.[0] ?? null)}
              className="mt-1.5 cursor-pointer bg-white text-slate-950"
            />
          </div>
          <div>
            <Label className="text-xs font-bold text-slate-700">
              Article video (optional)
            </Label>
            <Input
              type="file"
              accept="video/mp4,video/webm,video/quicktime"
              onChange={(event) => setVideo(event.target.files?.[0] ?? null)}
              className="mt-1.5 cursor-pointer bg-white text-slate-950"
            />
            <p className="mt-1 text-[11px] text-slate-400">
              <FileVideo className="mr-1 inline h-3 w-3" />
              MP4, WebM or MOV · max 100 MB
            </p>
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <input
            type="checkbox"
            checked={draft.isActive}
            onChange={(event) =>
              setDraft((current) => ({
                ...current,
                isActive: event.target.checked,
              }))
            }
          />
          Visible on website
        </label>
        <Button disabled={saving} className="gap-2 bg-slate-950">
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : editingId ? (
            <Save className="h-4 w-4" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
          {saving ? "Saving…" : editingId ? "Update post" : "Add post"}
        </Button>
      </form>
      <section>
        <h2 className="mb-4 text-xl font-black text-slate-950">
          Published content
        </h2>
        {loading ? (
          <Loader2 className="h-6 w-6 animate-spin" />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => {
              const source = builtins[post.imageUrl] ?? post.imageUrl;
              return (
                <article
                  key={post.id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  <div className="relative h-44 bg-slate-900">
                    <Image
                      src={source}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="400px"
                      unoptimized={source.startsWith("http://localhost:")}
                    />
                    {post.videoUrl && (
                      <span className="absolute right-3 top-3 rounded-full bg-black/70 px-2 py-1 text-[10px] font-bold text-white">
                        VIDEO
                      </span>
                    )}
                  </div>
                  <div className="space-y-3 p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                          {post.category}
                        </p>
                        <h3 className="mt-1 font-black text-slate-950">
                          {post.title}
                        </h3>
                      </div>
                      <span
                        className={`rounded-full px-2 py-1 text-[10px] font-bold ${post.isActive ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}
                      >
                        {post.isActive ? "Active" : "Hidden"}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => void patch(post, !post.isActive)}
                        className="flex-1 gap-1"
                      >
                        {post.isActive ? (
                          <EyeOff className="h-3.5 w-3.5" />
                        ) : (
                          <Eye className="h-3.5 w-3.5" />
                        )}
                        {post.isActive ? "Hide" : "Show"}
                      </Button>
                      <Button
                        type="button"
                        size="icon"
                        variant="outline"
                        onClick={() => edit(post)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        size="icon"
                        variant="outline"
                        onClick={() => void remove(post)}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
      <MarketingPageEditor
        pageKey="blogs"
        title="Newsletter Section"
        description="Manage the newsletter background and content shown at the bottom of the Blogs page."
        definitions={[
          {
            key: "newsletter",
            label: "Newsletter CTA",
            description: "Background image, heading and subscribe button",
            primaryTextLabel: "Subscribe button",
          },
        ]}
        builtinImages={{ "builtin:blog-newsletter": agtpAssets.exportPort.src }}
      />
    </div>
  );
}
