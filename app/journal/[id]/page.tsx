// app/journal/[id]/page.tsx
"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, Clock, Share2, Tag, ArrowUpRight } from "lucide-react";
import { JOURNAL_POSTS } from "@/lib/journal-data";

export default function JournalDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const post = JOURNAL_POSTS.find((item) => item.id === resolvedParams.id);

  if (!post) {
    notFound();
  }

  // Reading Progress Bar Setup
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [copied, setCopied] = useState(false);

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

  const relatedPosts = JOURNAL_POSTS.filter(
    (item) => item.id !== post.id && item.category === post.category
  ).slice(0, 2);

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
            <Tag size={12} /> {post.category}
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
              {post.author.name[0]}
            </div>
            <div>
              <div className="text-sm font-bold">{post.author.name}</div>
              <div className="ff-mono text-[9px] uppercase tracking-[.15em] text-[#9eafa7]">
                {post.author.role}
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
      <div className="container-ff max-w-5xl mb-16">
        <div className="media-wrap aspect-[21/9] rounded-[2rem] overflow-hidden border border-white/10">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Article Narrative Body */}
      <main className="container-ff max-w-3xl leading-loose text-base text-[#f3f3d9]/90 space-y-8 font-normal">
        {post.content.map((paragraph, index) => (
          <p key={index} className="text-lg leading-relaxed text-[#f3f3d9]/80">
            {paragraph}
          </p>
        ))}
      </main>

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <section className="container-ff max-w-4xl mt-32 border-t border-white/10 pt-16">
          <div className="ff-mono text-[10px] uppercase tracking-[0.25em] text-[#d6e86c] mb-8">
            Further Reading
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {relatedPosts.map((related) => (
              <Link
                key={related.id}
                href={`/journal/${related.id}`}
                className="group p-6 rounded-[1.5rem] bg-white/5 border border-white/10 hover:border-[#d6e86c]/50 transition"
              >
                <span className="ff-mono text-[9px] text-[#9eafa7] uppercase tracking-wider">
                  {related.category}
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