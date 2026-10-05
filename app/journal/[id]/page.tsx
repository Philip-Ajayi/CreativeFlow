"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, Clock, Share2, Tag, ArrowUpRight, Loader2 } from "lucide-react";
import { JournalPost } from "../page";

export default function JournalDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const slug = resolvedParams.id;

  const [post, setPost] = useState<JournalPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<JournalPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFoundError, setNotFoundError] = useState(false);
  const [copied, setCopied] = useState(false);

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    async function fetchArticle() {
      try {
        const res = await fetch("/api/blog");
        const data = await res.json();

        if (data.success && Array.isArray(data.posts)) {
          const matched = data.posts.find(
            (p: JournalPost) => p.slug === slug || p.id === slug
          );

          if (matched) {
            setPost(matched);
            // Get related posts with matching categories
            const related = data.posts
              .filter(
                (p: JournalPost) =>
                  p.slug !== matched.slug &&
                  p.categories?.some((cat) => matched.categories?.includes(cat))
              )
              .slice(0, 2);

            setRelatedPosts(
              related.length > 0
                ? related
                : data.posts.filter((p: JournalPost) => p.slug !== matched.slug).slice(0, 2)
            );
          } else {
            setNotFoundError(true);
          }
        }
      } catch (err) {
        console.error("Failed to load post details:", err);
        setNotFoundError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchArticle();
  }, [slug]);

  if (notFoundError) {
    notFound();
  }

  if (loading || !post) {
    return (
      <div className="min-h-screen bg-[#061f18] flex flex-col items-center justify-center text-[#f3f3d9]">
        <Loader2 className="animate-spin text-[#d6e86c] mb-4" size={32} />
        <p className="ff-mono text-xs uppercase tracking-[.2em] text-[#9eafa7]">
          Loading Article...
        </p>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.summary,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <article className="min-h-screen bg-[#061f18] text-[#f3f3d9] pt-28 pb-32">
      {/* Scroll Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1.5 bg-[#d6e86c] origin-left z-50"
      />

      {/* Header Container */}
      <header className="container-ff max-w-4xl pt-10 pb-16">
        <Link
          href="/journal"
          className="inline-flex items-center gap-2 ff-mono text-xs uppercase tracking-[0.2em] text-[#d6e86c] hover:underline mb-10"
        >
          <ArrowLeft size={14} /> Back to Journal
        </Link>

        <div className="flex items-center gap-4 text-xs ff-mono text-[#9eafa7] mb-6">
          <span className="flex items-center gap-1 text-[#d6e86c] uppercase">
            <Tag size={12} />{" "}
            {post.categories?.[0] ? `#${post.categories[0]}` : "General"}
          </span>
          <span>·</span>
          <span>{post.date}</span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Clock size={12} /> {post.readTime}
          </span>
        </div>

        <h1 className="ff-display text-5xl md:text-7xl uppercase leading-[.85] tracking-[-.06em]">
          {post.title}
        </h1>

        <p className="mt-8 text-lg text-[#9eafa7] leading-relaxed font-light border-l-2 border-[#d6e86c] pl-6">
          {post.summary}
        </p>

        {/* Author Bio Bar */}
        <div className="mt-10 flex items-center justify-between border-y border-white/10 py-5">
          <div className="flex items-center gap-4">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-[#1ba05c] ff-display text-xl uppercase font-bold text-[#f3f3d9]">
              {post.author ? post.author[0] : "F"}
            </div>
            <div>
              <div className="text-sm font-bold">{post.author}</div>
              <div className="ff-mono text-[9px] uppercase tracking-[.15em] text-[#9eafa7]">
                Contributor
              </div>
            </div>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 text-xs ff-mono uppercase tracking-wider text-[#d6e86c] hover:text-white transition"
          >
            <Share2 size={14} />
            {copied ? "Link Copied!" : "Share"}
          </button>
        </div>
      </header>

      {/* Featured Cover Media */}
      {post.image && (
        <div className="container-ff max-w-5xl mb-16">
          <div className="media-wrap aspect-[21/9] rounded-[2rem] overflow-hidden border border-white/10">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Article HTML Body */}
      <main
        className="container-ff max-w-3xl leading-relaxed text-base text-[#f3f3d9]/90 space-y-6 font-normal prose prose-invert prose-p:text-[#f3f3d9]/80 prose-headings:font-display prose-a:text-[#d6e86c]"
        dangerouslySetInnerHTML={{ __html: post.post }}
      />

      {/* Direct Substack Read Option */}
      {post.url && (
        <div className="container-ff max-w-3xl mt-12 pt-6 border-t border-white/10">
          <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs ff-mono uppercase tracking-[0.15em] text-[#d6e86c] hover:underline"
          >
            Read original on Substack <ArrowUpRight size={14} />
          </a>
        </div>
      )}

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <section className="container-ff max-w-4xl mt-32 border-t border-white/10 pt-16">
          <div className="ff-mono text-[10px] uppercase tracking-[0.25em] text-[#d6e86c] mb-8">
            Further Reading
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {relatedPosts.map((related) => (
              <Link
                key={related.slug}
                href={`/journal/${related.slug}`}
                className="group p-6 rounded-[1.5rem] bg-white/5 border border-white/10 hover:border-[#d6e86c]/50 transition"
              >
                <span className="ff-mono text-[9px] text-[#9eafa7] uppercase tracking-wider">
                  {related.categories?.[0]
                    ? `#${related.categories[0]}`
                    : "General"}
                </span>
                <h4 className="ff-display text-2xl uppercase mt-2 group-hover:text-[#d6e86c] transition">
                  {related.title}
                </h4>
                <div className="mt-6 flex items-center justify-between text-xs text-[#d6e86c]">
                  <span>Read Story</span>
                  <ArrowUpRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}