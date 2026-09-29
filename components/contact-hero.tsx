"use client";

import { motion } from "framer-motion";

export default function ContactHero() {
  return (
    <section className="mesh relative min-h-[60svh] overflow-hidden bg-[#0c3b2e]">
      {/* Background Decorative Element */}
      <div className="hero-ring right-[-10%] top-[10%] hidden md:block" />

      <div className="container-ff flex min-h-[60svh] flex-col justify-end pb-16 pt-36 md:pb-20 md:pt-44">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="ff-mono mb-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-[#d6e86c]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#d6e86c] shadow-[0_0_15px_#d6e86c]" />
          Get In Touch
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
          Let's start
          <br />
          <span className="ff-serif font-normal text-[#d6e86c]">
            a conversation.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 max-w-xl text-base leading-relaxed text-[#9eafa7] md:text-lg"
        >
          Have a brand to build, a manuscript ready for publishing, or a custom program for your team? We are ready when you are.
        </motion.p>
      </div>
    </section>
  );
}