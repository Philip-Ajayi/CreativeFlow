"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function SubmitHero() {
  return (
    <section className="mesh relative min-h-[85svh] overflow-hidden bg-[#0c3b2e]">
      {/* Decorative ambient ring */}
      <div className="hero-ring right-[-10%] top-[15%] hidden md:block" />

      <div className="container-ff flex min-h-[85svh] flex-col justify-between pb-12 pt-40 md:pb-16">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="ff-mono mb-6 flex items-center gap-3 text-[10px] uppercase tracking-[.3em] text-[#d6e86c]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#d6e86c] shadow-[0_0_15px_#d6e86c]" />
            Call for Submissions
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="ff-display max-w-[1200px] text-[15vw] uppercase leading-[.78] tracking-[-.08em] text-[#f3f3d9] md:text-[11vw]"
          >
            Submit to
            <br />
            <span className="ff-serif font-normal text-[#d6e86c]">
              the journal.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="mt-10 max-w-2xl text-base leading-relaxed text-[#f3f3d9]/70 md:text-xl md:leading-relaxed"
          >
            We're looking for short stories, poetry and creative nonfiction
            pieces that surprise us — bold voices, honest storytelling, and work
            that stays with the reader. If that's you, we'd love to read what
            you've written.
          </motion.p>
        </div>

        <div className="mt-16 flex items-center justify-between border-t border-white/10 pt-6 text-xs text-[#9eafa7]">
          <span className="ff-mono uppercase tracking-[.2em]">
            Reading Period Open
          </span>

          <a
            href="#guidelines"
            className="flex items-center gap-2 transition hover:text-[#d6e86c]"
          >
            <span>Read guidelines</span>
            <ArrowDown size={14} className="animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}