"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { blogs } from "@/lib/data";

export default function Blog() {
  const featured = blogs[0];

  return (
    <section className="bg-[#f3f3d9] py-28 text-[#0c3b2e] md:py-40">
      <div className="container-ff">
        <div className="mb-14 flex items-end justify-between">
          <div>
            <div className="ff-mono mb-5 text-[10px] uppercase tracking-[.3em] opacity-50">
              04 / Journal
            </div>

            <h2 className="ff-display display-md uppercase">
              From the
              <br />
              <span className="ff-serif font-normal">flow.</span>
            </h2>
          </div>

          <span className="hidden text-xs opacity-50 md:block">
            Ideas · Culture · Process
          </span>
        </div>

        <motion.article
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="group grid overflow-hidden rounded-[2rem] bg-[#0c3b2e] text-[#f3f3d9] md:grid-cols-2"
        >
          <div className="media-wrap aspect-[4/3] min-h-[340px] md:aspect-auto">
            <img src={featured.image} alt={featured.title} />
          </div>

          <div className="flex flex-col justify-between p-7 md:p-12">
            <div>
              <div className="mb-10 flex items-center justify-between">
                <span className="ff-mono text-[9px] uppercase tracking-[.2em] text-[#d6e86c]">
                  Featured story
                </span>

                <span className="ff-mono text-[9px] text-[#9eafa7]">
                  {featured.date}
                </span>
              </div>

              <h3 className="ff-display max-w-xl text-4xl uppercase leading-[.9] tracking-[-.055em] md:text-6xl">
                {featured.title}
              </h3>

              <p className="mt-7 max-w-lg text-sm leading-relaxed text-[#9eafa7]">
                {featured.summary}
              </p>
            </div>

            <a
              href="#"
              className="mt-12 flex w-fit items-center gap-3 border-b border-[#d6e86c]/40 pb-2 text-xs font-bold uppercase tracking-[.15em] text-[#d6e86c]"
            >
              Read article
              <ArrowUpRight size={15} />
            </a>
          </div>
        </motion.article>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {blogs.slice(1).map((blog) => (
            <article
              key={blog.title}
              className="group grid grid-cols-[120px_1fr] gap-5 border-t border-[#0c3b2e]/15 pt-5"
            >
              <div className="media-wrap aspect-square rounded-xl">
                <img src={blog.image} alt={blog.title} />
              </div>

              <div>
                <div className="ff-mono text-[8px] uppercase tracking-[.2em] opacity-45">
                  {blog.category}
                </div>

                <h3 className="mt-2 text-lg font-bold leading-tight">
                  {blog.title}
                </h3>

                <p className="mt-2 line-clamp-2 text-xs leading-relaxed opacity-55">
                  {blog.summary}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}