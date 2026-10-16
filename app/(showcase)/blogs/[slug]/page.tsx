import { cache } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Calendar, ChevronRight, Clock } from "lucide-react";

import { ReadingProgress } from "@/components/blog/reading-progress";
import { ShareButtons } from "@/components/blog/share-buttons";
import {
  Reveal,
  RevealEyebrow,
  RevealHeading,
  RevealStagger,
  RevealText
} from "@/components/ui/scroll-reveal";
import { blogImageSrc } from "@/lib/editorial/builtin-images";
import type { BlogPost } from "@/lib/editorial/types";
import { blogIdFromSlug, blogPostPath, prepareArticle } from "@/lib/rich-text";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

const apiUrl = process.env.API_URL ?? "http://localhost:3101/api";

const getPost = cache(async (id: string): Promise<BlogPost | null> => {
  try {
    const response = await fetch(`${apiUrl}/blogs/${encodeURIComponent(id)}`, {
      cache: "no-store"
    });
    return response.ok ? ((await response.json()) as BlogPost) : null;
  } catch {
    return null;
  }
});

async function getRelated(id: string): Promise<BlogPost[]> {
  try {
    const response = await fetch(`${apiUrl}/blogs`, { cache: "no-store" });
    if (!response.ok) return [];
    return ((await response.json()) as BlogPost[]).filter((post) => post.id !== id).slice(0, 3);
  } catch {
    return [];
  }
}

function formatDate(date: string): string {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const id = blogIdFromSlug((await params).slug);
  const post = id ? await getPost(id) : null;
  if (!post) return { title: "Article Not Found | AGTP GROUP" };
  const image = blogImageSrc(post.imageUrl);
  return {
    title: `${post.title} | AGTP GROUP`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedDate,
      images: /^https?:\/\//.test(image) ? [image] : undefined
    }
  };
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const id = blogIdFromSlug(slug);
  const post = id ? await getPost(id) : null;
  if (!post) notFound();

  // Keep one URL per article when its title (and so its slug) changes.
  const path = blogPostPath(post);
  if (`/blogs/${slug}` !== path) permanentRedirect(path);

  const related = await getRelated(post.id);
  const image = blogImageSrc(post.imageUrl);
  const { html, headings, readingMinutes } = prepareArticle(post.content);

  return (
    <div className="bg-[#060709] pb-24 text-white">
      <ReadingProgress targetId="article-body" />

      {/* ── Article header ── */}
      <header className="relative overflow-hidden pb-12 pt-[150px] sm:pt-[170px] lg:pt-[200px]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-24 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-[var(--agtp-secondary)] opacity-[0.12] blur-[120px]" />
          <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        </div>

        <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6">
          <RevealEyebrow>
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.16em] text-slate-400">
              <Link href="/" className="transition-colors hover:text-white">Home</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link href="/blogs" className="transition-colors hover:text-white">Blogs</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-[var(--agtp-secondary)]">{post.category}</span>
            </nav>
          </RevealEyebrow>

          <RevealHeading>
            <h1 className="mt-6 max-w-4xl text-[clamp(2rem,5vw,3.6rem)] font-black leading-[1.06] tracking-tight [overflow-wrap:anywhere]">
              {post.title}
            </h1>
          </RevealHeading>

          <RevealText>
            <p className="mt-5 max-w-3xl text-[17px] leading-relaxed text-slate-300 [overflow-wrap:anywhere] sm:text-[19px]">
              {post.excerpt}
            </p>
          </RevealText>

          <Reveal distance={16} duration={900} delay={200}>
            <div className="mt-8 flex flex-col gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--agtp-secondary)] text-sm font-black">
                  AG
                </span>
                <div>
                  <p className="text-sm font-bold">AGTP Group Editorial</p>
                  <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-slate-400">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      <time dateTime={post.publishedDate}>{formatDate(post.publishedDate)}</time>
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {readingMinutes} min read
                    </span>
                  </p>
                </div>
              </div>
              <ShareButtons title={post.title} path={path} />
            </div>
          </Reveal>
        </div>
      </header>

      {/* ── Cover ── */}
      <Reveal distance={40} duration={1000}>
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <figure className="relative aspect-[16/9] overflow-hidden rounded-[28px] border border-white/10 bg-[#0B1F33] shadow-2xl sm:aspect-[2/1]">
            {post.videoUrl ? (
              <video
                src={post.videoUrl}
                poster={image.startsWith("http") || image.startsWith("/") ? image : undefined}
                controls
                playsInline
                preload="metadata"
                className="h-full w-full bg-black object-cover"
              />
            ) : (
              <Image src={image} alt={post.title} fill priority sizes="(max-width: 1200px) 100vw, 1200px" className="object-cover" />
            )}
          </figure>
        </div>
      </Reveal>

      {/* ── Body + sidebar ── */}
      <div className="mx-auto grid max-w-[1200px] gap-12 px-4 pt-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16 lg:pt-20">
        <article id="article-body" className="min-w-0">
          <Reveal distance={24} duration={900}>
            <div
              className="rich-text rich-text-article max-w-[720px] text-[17px] leading-[1.85] text-slate-200 sm:text-[18px]"
              // Sanitized by the API when saved; legacy plain text is escaped.
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </Reveal>

          <Reveal distance={20} duration={800}>
            <div className="mt-14 flex max-w-[720px] flex-col gap-5 rounded-3xl border border-[#315671] bg-[#14314B]/60 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--agtp-secondary)] font-black">
                  AG
                </span>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Written by</p>
                  <p className="font-black">AGTP Group Editorial Team</p>
                  <p className="text-sm text-slate-400">Vehicle sourcing & export specialists, Dubai</p>
                </div>
              </div>
              <ShareButtons title={post.title} path={path} />
            </div>
          </Reveal>

          <Link
            href="/blogs"
            className="mt-10 inline-flex items-center gap-2 text-sm font-black text-[var(--agtp-secondary)] transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all articles
          </Link>
        </article>

        <aside className="min-w-0 space-y-6 lg:sticky lg:top-[180px] lg:self-start">
          {headings.length > 0 && (
            <nav aria-label="On this page" className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">On this page</p>
              <ul className="mt-4 space-y-1 border-l border-white/10">
                {headings.map((heading) => (
                  <li key={heading.id}>
                    <a
                      href={`#${heading.id}`}
                      className={`-ml-px line-clamp-3 border-l-2 border-transparent py-1.5 text-sm leading-snug text-slate-300 [overflow-wrap:anywhere] transition-colors hover:border-[var(--agtp-secondary)] hover:text-white ${heading.level === 3 ? "pl-7" : "pl-4"}`}
                    >
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <div className="relative overflow-hidden rounded-3xl border border-[var(--agtp-secondary)]/40 bg-[#14314B] p-6">
            <div aria-hidden="true" className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[var(--agtp-secondary)] opacity-25 blur-3xl" />
            <p className="relative text-[11px] font-black uppercase tracking-[0.2em] text-[var(--agtp-secondary)]">Work with us</p>
            <p className="relative mt-2 text-xl font-black leading-snug">Sourcing vehicles or parts from Dubai?</p>
            <p className="relative mt-2 text-sm leading-relaxed text-slate-300">
              Share your requirements and get pricing, availability and export details.
            </p>
            <Link
              href="/contact"
              className="relative mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--agtp-secondary)] px-5 py-3 text-sm font-black text-white transition-opacity hover:opacity-90"
            >
              Get a Quote
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </aside>
      </div>

      {/* ── More articles ── */}
      {related.length > 0 && (
        <section className="mx-auto max-w-[1200px] px-4 pt-24 sm:px-6">
          <div className="mb-8 flex items-end justify-between gap-4">
            <RevealHeading>
              <h2 className="text-[28px] font-black tracking-tight md:text-[36px]">More articles</h2>
            </RevealHeading>
            <Link href="/blogs" className="hidden items-center gap-2 text-sm font-black text-[var(--agtp-secondary)] hover:text-white sm:inline-flex">
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <RevealStagger staggerDelay={80} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.id}
                href={blogPostPath(item)}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--agtp-secondary)]/60 hover:bg-white/[0.05]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={blogImageSrc(item.imageUrl)}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-[11px] font-bold text-white backdrop-blur">
                    {item.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[12px] font-semibold text-slate-400">{formatDate(item.publishedDate)}</p>
                  <h3 className="mt-2 line-clamp-2 text-lg font-black leading-snug [overflow-wrap:anywhere] transition-colors group-hover:text-[var(--agtp-secondary)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-slate-400 [overflow-wrap:anywhere]">{item.excerpt}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-black text-[var(--agtp-secondary)]">
                    Read article
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </RevealStagger>
        </section>
      )}
    </div>
  );
}
