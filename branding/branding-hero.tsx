"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";

const floatingWords = [
  "IDENTITY",
  "STRATEGY",
  "EXPRESSION",
  "CULTURE",
];

export default function BrandingHero() {
  return (
    <section className="mesh relative min-h-[100svh] overflow-hidden bg-[#0c3b2e]">
      {/* Ambient orbs */}
      <motion.div
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.25, 0.4, 0.25],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-32 top-24 h-[520px] w-[520px] rounded-full bg-[#1ba05c]/30 blur-[100px]"
      />

      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          x: [0, 30, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-48 bottom-[-120px] h-[500px] w-[500px] rounded-full bg-[#d6e86c]/10 blur-[120px]"
      />

      {/* Rings */}
      <div className="hero-ring right-[-18%] top-[12%] hidden md:block" />

      <div className="hero-ring right-[3%] top-[23%] hidden scale-[.62] md:block" />

      <div className="container-ff relative flex min-h-[100svh] flex-col justify-between pb-8 pt-36 md:pb-10 md:pt-44">
        <div className="grid grid-cols-12">
          <div className="col-span-12 lg:col-span-10">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="ff-mono mb-7 flex items-center gap-3 text-[10px] uppercase tracking-[.3em] text-[#d6e86c]"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#d6e86c] shadow-[0_0_18px_#d6e86c]" />
              Cre8ive Branding
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 70 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.15,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="ff-display max-w-[1200px] text-[17vw] uppercase leading-[.73] tracking-[-.085em] text-[#f3f3d9] md:text-[13vw]"
            >
              Make them
              <br />
              <span className="relative inline-block">
                remember
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: 1.1,
                    delay: 1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="absolute bottom-[3%] left-0 h-[5px] bg-[#d6e86c] md:h-[9px]"
                />
              </span>
              <br />
              <span className="ff-serif font-normal lowercase text-[#d6e86c]">
                you.
              </span>
            </motion.h1>
          </div>

          <div className="col-span-12 mt-12 lg:col-span-4 lg:col-start-9 lg:mt-20">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35 }}
              className="max-w-md text-base leading-relaxed text-[#f3f3d9]/65 md:text-lg"
            >
              We turn ideas, personalities and ambitions into brands with
              clarity, character and a visual language people can recognise
              instantly.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <a
                href="#branding-services"
                className="ff-button ff-button-primary"
              >
                <span>Explore branding</span>
                <ArrowUpRight size={15} />
              </a>

              <Link
                href="/about"
                className="ff-button border border-white/15 bg-white/5 text-[#f3f3d9]"
              >
                Our approach
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Floating identity words */}
        <div className="pointer-events-none absolute right-[5%] top-[39%] hidden w-[250px] lg:block">
          {floatingWords.map((word, index) => (
            <motion.div
              key={word}
              initial={{ opacity: 0, x: 40 }}
              animate={{
                opacity: [0.15, 0.5, 0.15],
                x: [0, index % 2 ? -10 : 10, 0],
              }}
              transition={{
                opacity: {
                  duration: 4 + index,
                  repeat: Infinity,
                  delay: index * 0.4,
                },
                x: {
                  duration: 5 + index,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              className="ff-mono border-b border-white/10 py-3 text-right text-[9px] tracking-[.3em] text-[#d6e86c]"
            >
              {word}
            </motion.div>
          ))}
        </div>

        <div className="flex items-end justify-between border-t border-white/10 pt-5">
          <div className="hidden items-center gap-3 text-[9px] uppercase tracking-[.2em] text-[#9eafa7] sm:flex">
            <Sparkles size={13} className="text-[#d6e86c]" />
            For entrepreneurs · artists · creative brands
          </div>

          <div className="ml-auto flex items-center gap-3 text-[10px] uppercase tracking-[.2em] text-[#9eafa7]">
            Scroll to explore
            <ArrowDown size={14} className="animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}