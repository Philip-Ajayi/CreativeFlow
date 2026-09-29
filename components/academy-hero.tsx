"use client";

import { motion } from "framer-motion";
import { ArrowDown, Sparkles, BookOpen, Users } from "lucide-react";

export default function AcademyHero() {
  return (
    <section className="mesh relative min-h-[90svh] overflow-hidden bg-[#0c3b2e]">
      {/* Decorative hero rings */}
      <div className="hero-ring right-[-10%] top-[10%] hidden lg:block" />

      <div className="container-ff relative flex min-h-[90svh] flex-col justify-between pb-12 pt-36 md:pt-44">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="ff-mono mb-6 inline-flex items-center gap-3 rounded-full border border-[#d6e86c]/30 bg-[#d6e86c]/10 px-4 py-2 text-[10px] uppercase tracking-[0.25em] text-[#d6e86c]"
          >
            <Sparkles size={13} />
            For Aspiring Creatives Aged 14–40
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="ff-display display-xl uppercase text-[#f3f3d9]"
          >
            Cre8ive
            <br />
            <span className="ff-serif font-normal text-[#d6e86c]">Academy.</span>
          </motion.h1>

          <div className="mt-8 grid gap-8 md:grid-cols-12">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-2xl text-lg leading-relaxed text-[#f3f3d9]/80 md:col-span-7 md:text-xl"
            >
              We don't just teach creative theory — we build practical pathways for writers, editors, designers, and visual storytellers to transform creative energy into lifelong mastery.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col gap-4 md:col-span-5 md:items-end md:justify-end"
            >
              <div className="flex items-center gap-6 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#d6e86c] text-[#0c3b2e]">
                  <Users size={22} />
                </div>
                <div>
                  <div className="ff-display text-2xl text-[#f3f3d9]">1,500+</div>
                  <div className="ff-mono text-[9px] uppercase tracking-wider text-[#9eafa7]">
                    Creatives Mentored
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1ba05c] text-[#f3f3d9]">
                  <BookOpen size={22} />
                </div>
                <div>
                  <div className="ff-display text-2xl text-[#f3f3d9]">6 Tracks</div>
                  <div className="ff-mono text-[9px] uppercase tracking-wider text-[#9eafa7]">
                    Practical Offerings
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="mt-16 flex items-center justify-between border-t border-white/10 pt-6">
          <span className="ff-mono text-[10px] uppercase tracking-[0.2em] text-[#9eafa7]">
            Craft · Storytelling · Mentorship · Design
          </span>
          <a
            href="#upcoming-events"
            className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#d6e86c] hover:underline"
          >
            Explore Events <ArrowDown size={14} className="animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}