"use client";

import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";

export default function PublishingHero() {
  return (
    <section className="mesh relative min-h-[85svh] overflow-hidden bg-[#0c3b2e]">
      {/* Decorative Hero Ring */}
      <div className="hero-ring right-[-10%] top-[10%] hidden md:block" />

      <div className="container-ff flex min-h-[85svh] flex-col justify-end pb-12 pt-40 md:pb-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="ff-mono mb-6 flex items-center gap-3 text-[10px] uppercase tracking-[.3em] text-[#d6e86c]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#d6e86c] shadow-[0_0_15px_#d6e86c]" />
          Cre8ive Publishing — For Writers, Authors & Creators
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="ff-display max-w-[1200px] text-[15vw] uppercase leading-[.78] tracking-[-.08em] text-[#f3f3d9] md:text-[11vw]"
        >
          Turn your draft
          <br />
          <span className="ff-serif font-normal text-[#d6e86c]">
            into print.
          </span>
        </motion.h1>

        <div className="mt-12 grid gap-8 border-t border-white/10 pt-6 text-xs text-[#9eafa7] md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="max-w-xl text-base leading-relaxed text-[#f3f3d9]/80">
              We guide storytellers through every chapter of editing, cover & interior design, multi-format media production, and global platform distribution — giving your voice the physical and digital presence it deserves.
            </p>
          </div>

          <div className="flex items-center justify-between gap-4 md:col-span-5 md:justify-end">
            <a
              href="#submit-manuscript"
              className="ff-button ff-button-primary"
            >
              <span>Submit your manuscript</span>
              <ArrowDownRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}