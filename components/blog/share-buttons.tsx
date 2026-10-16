"use client";

import { useEffect, useState } from "react";
import { Check, Link2 } from "lucide-react";
import { siFacebook, siWhatsapp, siX } from "simple-icons";

function BrandIcon({ path }: { path: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d={path} />
    </svg>
  );
}

const linkedInPath =
  "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z";

/** Share links for the current article plus a copy-link button. */
export function ShareButtons({ title, path }: { title: string; path: string }) {
  const [url, setUrl] = useState(path);
  const [copied, setCopied] = useState(false);

  useEffect(() => setUrl(`${window.location.origin}${path}`), [path]);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const links = [
    { label: "Share on WhatsApp", href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`, icon: <BrandIcon path={siWhatsapp.path} /> },
    { label: "Share on LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, icon: <BrandIcon path={linkedInPath} /> },
    { label: "Share on Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, icon: <BrandIcon path={siFacebook.path} /> },
    { label: "Share on X", href: `https://x.com/intent/post?url=${encodedUrl}&text=${encodedTitle}`, icon: <BrandIcon path={siX.path} /> }
  ];

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (e.g. insecure context); nothing to do.
    }
  }

  const buttonClass =
    "flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-colors hover:border-[var(--agtp-secondary)] hover:bg-[var(--agtp-secondary)] hover:text-white";

  return (
    <div className="flex flex-wrap items-center gap-2">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          title={link.label}
          className={buttonClass}
        >
          {link.icon}
        </a>
      ))}
      <button type="button" onClick={() => void copy()} aria-label="Copy link" title={copied ? "Copied!" : "Copy link"} className={buttonClass}>
        {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
      </button>
    </div>
  );
}
