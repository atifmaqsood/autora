"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Download, FileText, X } from "lucide-react";

/** The brochure URL that downloads the PDF (named after the page) instead of opening it. */
function downloadUrl(url: string, title: string) {
  const name = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "agtp"}-brochure.pdf`;
  return `${url}${url.includes("?") ? "&" : "?"}download=${encodeURIComponent(name)}`;
}

export function BrochureViewer({ url, title }: { url: string; title: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [open]);

  const download = downloadUrl(url, title);

  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => { dialog.current?.showModal(); setOpen(true); }}
          className="inline-flex items-center gap-3 rounded-full border border-[var(--agtp-secondary)] px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[var(--agtp-secondary)]"
        >
          <FileText className="h-4 w-4" /> Open Brochure <ArrowUpRight className="h-4 w-4" />
        </button>
        <a
          href={download}
          download
          className="inline-flex items-center gap-3 rounded-full bg-[var(--agtp-secondary)] px-7 py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
        >
          <Download className="h-4 w-4" /> Download Brochure
        </a>
      </div>
      <dialog
        ref={dialog}
        aria-labelledby="brochure-title"
        onClose={() => setOpen(false)}
        onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}
        className="fixed inset-0 m-auto h-[85dvh] max-h-[900px] w-[calc(100%-2rem)] max-w-5xl overflow-hidden rounded-2xl border border-white/15 bg-[#0B1F33] p-0 text-white shadow-2xl backdrop:bg-black/80 backdrop:backdrop-blur-sm"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-4 border-b border-white/15 p-4 sm:px-6">
            <h2 id="brochure-title" className="text-sm font-bold sm:text-lg">{title} — Brochure</h2>
            <button type="button" aria-label="Close brochure" onClick={() => dialog.current?.close()} className="shrink-0 rounded-full p-2 hover:bg-white/10"><X className="h-5 w-5" /></button>
          </div>
          {open && <iframe src={url} title={`${title} PDF brochure`} className="min-h-0 w-full flex-1 border-0 bg-white" />}
          <div className="border-t border-white/15 px-6 py-3 text-sm">
            <div className="flex flex-wrap gap-5">
              <a href={url} target="_blank" rel="noopener noreferrer" className="text-[var(--agtp-secondary)] underline underline-offset-4">Open PDF in a new tab</a>
              <a href={download} download className="inline-flex items-center gap-1.5 text-[var(--agtp-secondary)] underline underline-offset-4"><Download className="h-4 w-4" /> Download PDF</a>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
