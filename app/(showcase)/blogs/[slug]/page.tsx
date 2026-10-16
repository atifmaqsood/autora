import { cache } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Tag } from "lucide-react";

import { PageHero } from "@/components/ui/page-hero";
import { Reveal, RevealHeading, RevealStagger } from "@/components/ui/scroll-reveal";
import { blogImageSrc } from "@/lib/editorial/builtin-images";
import type { BlogPost } from "@/lib/editorial/types";
import { blogIdFromSlug, blogPostPath, toRichTextHtml } from "@/lib/rich-text";

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
  const canonicalPath = blogPostPath(post);
  if (`/blogs/${slug}` !== canonicalPath) permanentRedirect(canonicalPath);

  const related = await getRelated(post.id);
  const image = blogImageSrc(post.imageUrl);

  return (
    <div className="bg-[#060709] pb-24 text-white">
      <PageHero
        breadcrumbs={[
          { label: "HOME", href: "/" },
          { label: "BLOGS", href: "/blogs" },
          { label: post.category.toUpperCase() }
        ]}
        badge={{ text: post.category }}
        title={post.title}
        subtitle={post.excerpt}
        imageSrc={image}
        imageAlt={post.title}
      />

      <article className="mx-auto max-w-[900px] px-4 pt-16 sm:px-6 sm:pt-20">
        <Reveal distance={20} duration={700}>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-[#24445F] pb-6 text-[12px] font-bold uppercase tracking-widest text-slate-400">
            <span className="inline-flex items-center gap-2">
              <Calendar className="h-4 w-4 text-[var(--agtp-secondary)]" />
              {formatDate(post.publishedDate)}
            </span>
            <span className="inline-flex items-center gap-2">
              <Tag className="h-4 w-4 text-[var(--agtp-secondary)]" />
              {post.category}
            </span>
          </div>
        </Reveal>

        {post.videoUrl && (
          <Reveal distance={30} duration={800} className="mt-10">
            <video
              src={post.videoUrl}
              poster={/^https?:\/\//.test(image) || image.startsWith("/") ? image : undefined}
              controls
              playsInline
              preload="metadata"
              className="aspect-video w-full rounded-3xl border border-[#315671] bg-black object-cover shadow-2xl"
            />
          </Reveal>
        )}

        <Reveal distance={30} duration={800} className="mt-10">
          <div
            className="rich-text text-[17px] leading-8 text-slate-200 sm:text-[18px]"
            // Sanitized by the API when saved; legacy plain text is escaped.
            dangerouslySetInnerHTML={{ __html: toRichTextHtml(post.content) }}
          />
        </Reveal>

        <div className="mt-14 border-t border-[#24445F] pt-8">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-[13px] font-black text-[var(--agtp-secondary)] transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all articles
          </Link>
        </div>
      </article>

      {related.length > 0 && (
        <section className="mx-auto max-w-[1570px] px-4 pt-20 sm:px-6">
          <RevealHeading>
            <h2 className="mb-8 text-center text-[28px] font-black uppercase tracking-tight md:text-[38px]">
              More Articles
            </h2>
          </RevealHeading>
          <RevealStagger staggerDelay={80} className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.id}
                href={blogPostPath(item)}
                className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-[#315671] bg-[#14314B] shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-[var(--agtp-secondary)]"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={blogImageSrc(item.imageUrl)}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                    {formatDate(item.publishedDate)}
                  </p>
                  <h3 className="mt-2 line-clamp-2 text-[19px] font-black leading-snug text-white transition-colors group-hover:text-[#FDBA74]">
                    {item.title}
                  </h3>
                  <span className="mt-auto inline-flex items-center gap-2 pt-4 text-[13px] font-black text-[var(--agtp-secondary)]">
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
