"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="mesh relative min-h-[100svh] overflow-hidden bg-[#0c3b2e]">
      <div className="hero-ring right-[-15%] top-[12%] hidden md:block" />
      <div className="hero-ring right-[8%] top-[22%] hidden scale-[.72] md:block" />

      <div className="container-ff relative flex min-h-[100svh] flex-col justify-between pb-7 pt-32 md:pb-10 md:pt-40">
        <div className="grid grid-cols-12">
          <div className="col-span-12 lg:col-span-10">
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="ff-mono mb-7 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-[#d6e86c]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#d6e86c] shadow-[0_0_15px_#d6e86c]" />
              Independent creative studio · Nigeria
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.1,
                delay: 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="ff-display display-xl max-w-[1100px] uppercase text-[#f3f3d9]"
            >
              Creativity
              <br />
              <span className="text-[#d6e86c]">in motion.</span>
            </motion.h1>
          </div>

          <div className="col-span-12 mt-10 lg:col-span-4 lg:col-start-9 lg:mt-20">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="max-w-md text-lg leading-relaxed text-[#f3f3d9]/70"
            >
              FreeFlow is a creative hub for brands, publishers and people
              building meaningful things with imagination.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <a href="#work" className="ff-button ff-button-primary">
                <span>Explore the studio</span>
                <ArrowUpRight size={16} />
              </a>

              <Link
                href="/about"
                className="ff-button border border-white/15 bg-white/5 text-[#f3f3d9]"
              >
                <span>Our story</span>
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="flex items-end justify-between border-t border-white/10 pt-5">
          <div className="ff-mono max-w-[250px] text-[9px] uppercase leading-relaxed tracking-[0.2em] text-[#9eafa7]">
            Branding
            <br />
            Publishing
            <br />
            Academy
          </div>

          <div className="hidden items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-[#9eafa7] sm:flex">
            Scroll to explore
            <ArrowDown size={14} className="animate-bounce" />
          </div>

          <div className="ff-mono text-[9px] text-[#9eafa7]">
            09°04′N / 7°29′E
          </div>
        </div>
      </div>
    </section>
  );
}