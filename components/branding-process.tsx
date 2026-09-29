"use client";

import { motion } from "framer-motion";

const steps = [
  {
    step: "01",
    title: "Discovery & Strategy",
    text: "We uncover your core narrative, target audience, and market positioning before touching design.",
  },
  {
    step: "02",
    title: "Visual Exploration",
    text: "Drafting concepts, custom typography, logo marks, and visual moodboards tailored to your DNA.",
  },
  {
    step: "03",
    title: "System Refinement",
    text: "Solidifying color palettes, grid systems, guidelines, and brand touchpoints into a unified identity.",
  },
  {
    step: "04",
    title: "Launch & Delivery",
    text: "Delivering complete brand asset suites and guideline documents ready for physical and digital deployment.",
  },
];

export default function BrandingProcess() {
  return (
    <section className="bg-[#0c3b2e] py-28 md:py-40">
      <div className="container-ff">
        <div className="mb-20">
          <div className="ff-mono mb-5 text-[10px] uppercase tracking-[.3em] text-[#d6e86c]">
            The Journey
          </div>
          <h2 className="ff-display display-lg uppercase">
            How we shape
            <br />
            <span className="ff-serif font-normal text-[#d6e86c]">
              identities.
            </span>
          </h2>
        </div>

        <div className="space-y-0">
          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="grid gap-8 border-t border-white/10 py-9 md:grid-cols-12 md:py-12"
            >
              <div className="ff-mono text-[10px] text-[#d6e86c] md:col-span-2">
                {item.step}
              </div>

              <h3 className="ff-display text-3xl uppercase leading-none md:col-span-4 md:text-5xl text-[#f3f3d9]">
                {item.title}
              </h3>

              <p className="max-w-xl text-sm leading-relaxed text-[#9eafa7] md:col-span-5 md:col-start-8">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}