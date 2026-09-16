"use client";

import { motion } from "framer-motion";

export default function BrandingManifesto() {
  return (
    <section className="relative overflow-hidden bg-[#1ba05c] py-32 md:py-48">
      {/* Orbiting decorative circles */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
      />

      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d6e86c]/20"
      />

      <div className="container-ff relative">
        <div className="mx-auto max-w-6xl text-center">
          <div className="ff-mono mb-8 text-[10px] uppercase tracking-[.3em] text-[#061f18]/60">
            03 / The belief
          </div>

          <motion.h2
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="ff-display text-5xl uppercase leading-[.82] tracking-[-.075em] text-[#f3f3d9] md:text-[7.5rem]"
          >
            Your brand should
            <br />
            <span className="ff-serif font-normal text-[#d6e86c]">
              feel like you.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.8 }}
            className="mx-auto mt-10 max-w-2xl text-base leading-relaxed text-[#061f18]/70 md:text-lg"
          >
            Distinctive does not mean complicated. We look for the idea at the
            heart of your brand and give it a visual language that feels
            unmistakably yours.
          </motion.p>
        </div>
      </div>
    </section>
  );
}