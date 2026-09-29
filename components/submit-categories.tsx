"use client";

import { motion } from "framer-motion";
import { Sparkles, Feather, FileText, CheckCircle2 } from "lucide-react";

const categories = [
  {
    title: "Flash Fiction",
    limit: "up to 1,000 words",
    description: "Compressed, punchy, and complete narratives that deliver an immediate emotional impact.",
    icon: Sparkles,
  },
  {
    title: "Short Stories",
    limit: "up to 3,000 words",
    description: "Any genre. Complete, polished prose with distinct narrative voice and resonant character arcs.",
    icon: FileText,
  },
  {
    title: "Poetry",
    limit: "up to 5 poems per submission",
    description: "Any style or form. Visceral language, rhythmic cadence, and evocative imagery.",
    icon: Feather,
  },
];

const corePrinciples = [
  "We welcome new and emerging writers as much as experienced ones",
  "Previously unpublished work only (including personal blogs and social media)",
];

export default function SubmitCategories() {
  return (
    <section className="bg-[#f3f3d9] py-28 text-[#0c3b2e] md:py-40">
      <div className="container-ff">
        <div className="mb-20 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            
            <h2 className="ff-display display-lg uppercase">
              What we're
              <br />
              <span className="ff-serif font-normal">looking for.</span>
            </h2>
          </div>

          <div className="flex flex-col justify-end md:col-span-5">
            <p className="text-base leading-relaxed opacity-65">
              We value clarity, voice, and narrative risk. We read every single
              submission with care and respect for the craft behind it.
            </p>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group flex flex-col justify-between rounded-[2rem] border border-[#0c3b2e]/10 bg-[#0c3b2e]/5 p-8 transition-colors hover:bg-[#0c3b2e] hover:text-[#f3f3d9]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <Icon size={26} strokeWidth={1.5} />
                    <span className="ff-mono rounded-full border border-current/20 px-3 py-1 text-[9px] uppercase tracking-[.15em]">
                      {cat.limit}
                    </span>
                  </div>

                  <h3 className="ff-display mt-14 text-4xl uppercase tracking-[-.05em]">
                    {cat.title}
                  </h3>

                  <p className="mt-4 text-sm leading-relaxed opacity-70 group-hover:opacity-80">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-10 pt-4 border-t border-current/10 ff-mono text-[10px] uppercase tracking-[.2em] opacity-40">
                  Category 0{index + 1}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Core Principles */}
        <div className="mt-12 rounded-[2rem] bg-[#0c3b2e] p-8 text-[#f3f3d9] md:p-12">
          <div className="grid gap-8 md:grid-cols-2">
            {corePrinciples.map((principle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="flex items-start gap-4"
              >
                <CheckCircle2
                  size={22}
                  className="mt-1 shrink-0 text-[#d6e86c]"
                />
                <p className="ff-display text-xl uppercase leading-tight tracking-[-.02em] md:text-2xl">
                  {principle}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}