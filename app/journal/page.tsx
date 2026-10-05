"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Search, Sparkles, Tag, Clock, Loader2 } from "lucide-react";

export interface JournalPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  post: string;
  categories: string[];
  image: string | null;
  date: string | null;
  time: string | null;
  publishedAt: string | null;
  url: string | null;
  author: string;
  readTime: string;
}

export default function JournalPage() {
  const [posts, setPosts] = useState<JournalPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/blog");
        const data = await res.json();

        if (data.success && Array.isArray(data.posts)) {
          setPosts(data.posts);
        }
      } catch (err) {
        console.error("Failed to load journal posts:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  // Dynamically extract unique categories/hashtags from posts
  const categories = useMemo(() => {
    const allTags = posts.flatMap((p) => p.categories || []);
    return ["All", ...Array.from(new Set(allTags))];
  }, [posts]);

  // Filter posts by category and search term
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" ||
        post.categories?.includes(selectedCategory);

      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  const featuredPost = posts[0];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0c3b2e] flex flex-col items-center justify-center text-[#f3f3d9]">
        <Loader2 className="animate-spin text-[#d6e86c] mb-4" size={32} />
        <p className="ff-mono text-xs uppercase tracking-[.2em] text-[#9eafa7]">
          Loading Journal...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0c3b2e] text-[#f3f3d9]">
      {/* Hero Header */}
      <section className="mesh relative pt-36 pb-20 overflow-hidden bg-[#0c3b2e]">
        <div className="container-ff relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="ff-mono mb-6 text-[10px] uppercase tracking-[.3em] text-[#d6e86c]"
          >
            Journal & Insights
          </motion.div>

          <div className="grid gap-10 md:grid-cols-12 md:items-end">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="ff-display text-[15vw] md:text-[10vw] uppercase leading-[.78] tracking-[-.07em] md:col-span-8"
            >
              Thoughts
              <br />
              <span className="ff-serif font-normal text-[#d6e86c]">in flow.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base text-[#9eafa7] leading-relaxed md:col-span-4 md:col-start-9"
            >
              Perspectives on design systems, brand evolution, tactile publishing, and creative education from the studio team.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Featured Spotlight Article */}
      {!searchQuery && selectedCategory === "All" && featuredPost && (
        <section className="container-ff mb-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="group relative overflow-hidden rounded-[2.5rem] bg-[#061f18] border border-white/10 grid md:grid-cols-12"
          >
            <div className="media-wrap aspect-[16/10] md:aspect-auto md:col-span-7 relative min-h-[350px]">
              {featuredPost.image ? (
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="h-full w-full bg-[#123f32]" />
              )}
              <div className="absolute top-6 left-6 flex items-center gap-2 rounded-full bg-[#061f18]/80 backdrop-blur-md px-4 py-1.5 border border-white/15">
                <Sparkles size={12} className="text-[#d6e86c]" />
                <span className="ff-mono text-[9px] uppercase tracking-[.2em] text-[#d6e86c]">
                  Featured Story
                </span>
              </div>
            </div>

            <div className="p-8 md:p-12 md:col-span-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-[#9eafa7] ff-mono mb-6">
                  <span>
                    {featuredPost.categories?.[0]
                      ? `#${featuredPost.categories[0]}`
                      : "General"}
                  </span>
                  <span>{featuredPost.date}</span>
                </div>

                <h2 className="ff-display text-4xl md:text-5xl uppercase leading-[.88] tracking-[-.05em] group-hover:text-[#d6e86c] transition-colors">
                  {featuredPost.title}
                </h2>

                <p className="mt-6 text-sm text-[#9eafa7] leading-relaxed">
                  {featuredPost.summary}
                </p>
              </div>

              <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-6">
                <span className="ff-mono text-xs text-[#9eafa7] flex items-center gap-1.5">
                  <Clock size={13} /> {featuredPost.readTime}
                </span>

                <Link
                  href={`/journal/${featuredPost.slug}`}
                  className="ff-button ff-button-primary inline-flex items-center gap-2 text-xs"
                >
                  <span>Read Article</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* Filter Toolbar & Search */}
      <section className="container-ff sticky top-20 z-30 mb-12">
        <div className="glass-dark rounded-full p-2 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 backdrop-blur-xl">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-[#d6e86c] text-[#061f18]"
                    : "text-[#f3f3d9]/70 hover:text-white hover:bg-white/5"
                }`}
              >
                {cat === "All" ? cat : `#${cat}`}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72 px-2">
            <Search
              size={15}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-[#9eafa7]"
            />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 rounded-full py-2 pl-10 pr-4 text-xs text-[#f3f3d9] placeholder-[#9eafa7]/60 border border-white/10 focus:outline-none focus:border-[#d6e86c] transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Journal Grid */}
      <section className="container-ff pb-32">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-[2rem]">
            <p className="ff-mono text-xs uppercase tracking-[.2em] text-[#9eafa7]">
              No articles found matching "{searchQuery}"
            </p>
          </div>
        ) : (
          <motion.div layout className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {filteredPosts.map((post) => (
                <motion.article
                  layout
                  key={post.slug}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="group flex flex-col justify-between rounded-[2rem] border border-white/10 bg-[#061f18]/60 p-6 hover:border-[#d6e86c]/50 transition-colors duration-300"
                >
                  <div>
                    {/* Post Image Wrap */}
                    <Link href={`/journal/${post.slug}`}>
                      <div className="media-wrap aspect-[16/10] rounded-xl overflow-hidden mb-6 bg-[#123f32]">
                        {post.image ? (
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="h-full w-full bg-[#123f32]" />
                        )}
                      </div>
                    </Link>

                    {/* Metadata */}
                    <div className="flex items-center justify-between text-[10px] ff-mono uppercase tracking-[.18em] text-[#d6e86c] mb-3">
                      <span className="flex items-center gap-1">
                        <Tag size={11} />{" "}
                        {post.categories?.[0]
                          ? `#${post.categories[0]}`
                          : "General"}
                      </span>
                      <span className="text-[#9eafa7]">{post.date}</span>
                    </div>

                    {/* Title & Excerpt */}
                    <Link href={`/journal/${post.slug}`}>
                      <h3 className="ff-display text-2xl uppercase leading-snug tracking-tight group-hover:text-[#d6e86c] transition-colors">
                        {post.title}
                      </h3>
                    </Link>

                    <p className="mt-3 text-xs leading-relaxed text-[#9eafa7] line-clamp-3">
                      {post.summary}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="ff-mono text-[10px] text-[#9eafa7] flex items-center gap-1">
                      <Clock size={11} /> {post.readTime}
                    </span>

                    <Link
                      href={`/journal/${post.slug}`}
                      className="grid h-9 w-9 place-items-center rounded-full bg-white/5 text-[#d6e86c] group-hover:bg-[#d6e86c] group-hover:text-[#061f18] transition-all"
                    >
                      <ArrowUpRight size={16} />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>
    </div>
  );
}