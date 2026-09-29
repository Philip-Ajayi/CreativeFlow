"use client";

import { motion } from "framer-motion";

export default function BrandingHero() {
  return (
    <section className="mesh relative min-h-[85svh] overflow-hidden bg-[#0c3b2e]">
      <div className="container-ff flex min-h-[85svh] flex-col justify-end pb-12 pt-40 md:pb-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="ff-mono mb-6 text-[10px] uppercase tracking-[.3em] text-[#d6e86c]"
        >
          Cre8ive Branding
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
          Visual identities
          <br />
          <span className="ff-serif font-normal text-[#d6e86c]">
            that resonate.
          </span>
        </motion.h1>

        <div className="mt-12 flex max-w-3xl justify-between gap-8 border-t border-white/10 pt-5 text-xs text-[#9eafa7]">
          <span>For Entrepreneurs, Artists & Creative Brands</span>
          <span className="hidden sm:block">Strategy · Identity · Design</span>
        </div>
      </div>
    </section>
  );
}