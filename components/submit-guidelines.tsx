"use client";

import { motion } from "framer-motion";
import { Clock, Check } from "lucide-react";

const guidelines = [
  {
    num: "01",
    title: "One piece at a time",
    detail: "Submit only one piece at a time (one short story or one poem). Please wait for a response before submitting again.",
  },
  {
    num: "02",
    title: "Third-Person Bio",
    detail: "Include a brief third-person biography (50 words or less) in your submission form.",
  },
  {
    num: "03",
    title: "Document Formatting",
    detail: "Word document (.doc / .docx), 12pt standard readable font (Times New Roman, Arial, or Garamond), double-spaced for prose.",
  },
  {
    num: "04",
    title: "Simultaneous Submissions",
    detail: "Simultaneous submissions are welcome — just notify us immediately if your piece is accepted elsewhere.",
  },
];

export default function SubmitGuidelines() {
  return (
    <section id="guidelines" className="bg-[#061f18] py-28 text-[#f3f3d9] md:py-40">
      <div className="container-ff">
        <div className="mb-20 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-8">

            <h2 className="ff-display display-lg uppercase">
              Submission
              <br />
              <span className="ff-serif font-normal text-[#d6e86c]">
                guidelines.
              </span>
            </h2>
          </div>

          {/* Response time highlight */}
          <div className="md:col-span-4 md:self-end">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md">
              <div className="flex items-center gap-3 text-[#d6e86c]">
                <Clock size={18} />
                <span className="ff-mono text-[10px] uppercase tracking-[.2em]">
                  Expected Response Time
                </span>
              </div>
              <div className="ff-display mt-3 text-3xl uppercase text-[#f3f3d9]">
                Within 2–3 weeks
              </div>
              <p className="mt-2 text-xs leading-relaxed text-[#9eafa7]">
                We review every piece carefully. You will hear back from an editor regardless of the decision.
              </p>
            </div>
          </div>
        </div>

        {/* Guidelines List */}
        <div className="space-y-0">
          {guidelines.map((item, index) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.08 }}
              className="grid gap-6 border-t border-white/10 py-10 md:grid-cols-12 md:py-12"
            >
              <div className="ff-mono text-sm text-[#d6e86c] md:col-span-2">
                {item.num}
              </div>

              <h3 className="ff-display text-3xl uppercase tracking-[-.04em] text-[#f3f3d9] md:col-span-4 md:text-5xl">
                {item.title}
              </h3>

              <p className="max-w-xl text-sm leading-relaxed text-[#9eafa7] md:col-span-5 md:col-start-8">
                {item.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}