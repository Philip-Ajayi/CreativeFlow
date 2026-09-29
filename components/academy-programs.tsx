"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { academyPrograms, AcademyProgram } from "@/lib/academy-data";

export default function AcademyPrograms() {
  return (
    <section id="programs" className="bg-[#f3f3d9] py-28 text-[#0c3b2e] md:py-40">
      <div className="container-ff">
        <div className="mb-20 grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <div className="ff-mono mb-4 text-[10px] uppercase tracking-[0.3em] opacity-50">
              Core Learning Tracks
            </div>
            <h2 className="ff-display display-lg uppercase">
              How we grow
              <br />
              <span className="ff-serif font-normal text-[#1ba05c]">together.</span>
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed opacity-65 md:col-span-4">
            From teenagers discovering storytelling to young adults building professional careers in graphic design, editing, and publishing.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {academyPrograms.map((program: AcademyProgram, index: number) => (
            <motion.article
              key={program.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="group flex flex-col justify-between overflow-hidden rounded-[2rem] border border-[#0c3b2e]/10 bg-white/60 p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
            >
              <div>
                {/* Relatable High Quality Image */}
                <div className="media-wrap relative aspect-[16/10] overflow-hidden rounded-2xl bg-[#0c3b2e]/10">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute left-4 top-4 rounded-full bg-[#0c3b2e]/80 px-3 py-1.5 backdrop-blur-md">
                    <span className="ff-mono text-[8px] uppercase tracking-[0.2em] text-[#d6e86c]">
                      {program.badge}
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="ff-mono text-[9px] uppercase tracking-[0.2em] opacity-50">
                    {program.targetAudience}
                  </div>

                  <h3 className="ff-display mt-2 text-3xl uppercase tracking-[-0.03em] text-[#0c3b2e]">
                    {program.title}
                  </h3>

                  <p className="ff-serif mt-1 text-sm text-[#1ba05c]">
                    "{program.tagline}"
                  </p>

                  <p className="mt-4 text-xs leading-relaxed opacity-70">
                    {program.description}
                  </p>
                </div>
              </div>

              <div className="mt-8 border-t border-[#0c3b2e]/10 pt-4">
                <div className="space-y-2">
                  {program.highlights.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs opacity-80">
                      <CheckCircle2 size={13} className="shrink-0 text-[#1ba05c]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="#upcoming-events"
                  className="mt-6 flex items-center justify-between font-mono text-xs font-bold uppercase tracking-wider text-[#0c3b2e] group-hover:text-[#1ba05c]"
                >
                  <span>Explore Cohorts</span>
                  <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}