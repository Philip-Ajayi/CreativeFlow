"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discover",
    text: "We get inside the idea, the ambition, the audience and the problem your brand needs to solve.",
  },
  {
    number: "02",
    title: "Define",
    text: "We turn insight into positioning, creative direction and a clear identity territory.",
  },
  {
    number: "03",
    title: "Design",
    text: "We translate the strategy into visual expression — from logo and typography to the wider brand system.",
  },
  {
    number: "04",
    title: "Deploy",
    text: "We give you the tools, guidelines and confidence to keep the brand moving consistently.",
  },
];

export default function BrandingProcess() {
  return (
    <section className="relative overflow-hidden bg-[#061f18] py-28 md:py-40">
      <div className="container-ff">
        <div className="mb-20 grid gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="ff-mono mb-5 text-[10px] uppercase tracking-[.3em] text-[#d6e86c]">
              02 / The process
            </div>

            <h2 className="ff-display display-md uppercase">
              Think it.
              <br />
              <span className="ff-serif font-normal text-[#d6e86c]">
                Shape it.
              </span>
              <br />
              Make it real.
            </h2>
          </div>

          <p className="max-w-md self-end text-base leading-relaxed text-[#9eafa7] md:col-span-4 md:col-start-9">
            No copy-and-paste formulas. Every identity starts with a
            conversation and develops around what makes your brand yours.
          </p>
        </div>

        <div className="border-t border-white/10">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{
                duration: 0.8,
                delay: index * 0.08,
              }}
              className="group grid gap-6 border-b border-white/10 py-9 md:grid-cols-12 md:items-center md:py-12"
            >
              <div className="ff-mono text-[10px] text-[#d6e86c] md:col-span-1">
                {step.number}
              </div>

              <h3 className="ff-display text-4xl uppercase tracking-[-.05em] md:col-span-4 md:text-6xl">
                {step.title}
              </h3>

              <p className="max-w-lg text-sm leading-relaxed text-[#9eafa7] md:col-span-5 md:col-start-7 md:text-base">
                {step.text}
              </p>

              <ArrowUpRight
                size={20}
                className="hidden text-[#d6e86c] opacity-30 transition duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:opacity-100 md:block"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}