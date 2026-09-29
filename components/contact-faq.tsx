"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What happens after I submit a project inquiry?",
    answer:
      "Our team reviews your project scope and budget requirements within 24-48 hours. We'll then send a link to schedule an introductory discovery call or reply directly with additional initial questions.",
  },
  {
    question: "Do you work with international clients outside Nigeria?",
    answer:
      "Yes! FreeFlow works with authors, founders, and creative brands across Africa, Europe, North America, and beyond using modern collaboration tools.",
  },
  {
    question: "What is the typical timeline for a branding project?",
    answer:
      "Branding sprints range from 4 to 8 weeks depending on the complexity of deliverables (visual identity, brand guidelines, digital assets, collateral design).",
  },
  {
    question: "How does the publishing process work with FreeFlow?",
    answer:
      "We offer end-to-end publishing support: editorial guidance, interior layout design, cover artwork, print production management, and launch strategy.",
  },
];

export default function ContactFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#0c3b2e] py-28 text-[#f3f3d9] md:py-36">
      <div className="container-ff">
        <div className="mb-16 grid gap-8 md:grid-cols-12">
          <div className="md:col-span-6">
            <div className="ff-mono mb-4 text-[10px] uppercase tracking-[.3em] text-[#d6e86c]">
              Answers
            </div>
            <h2 className="ff-display display-md uppercase">
              Frequently
              <br />
              <span className="ff-serif font-normal text-[#d6e86c]">
                asked questions.
              </span>
            </h2>
          </div>
          <div className="flex items-end md:col-span-6">
            <p className="max-w-md text-sm leading-relaxed text-[#9eafa7]">
              Got questions before starting? Here are answers to common questions about our process, timelines, and engagements.
            </p>
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="max-w-4xl space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="flex w-full items-center justify-between gap-4 p-6 text-left transition hover:bg-white/[0.02]"
                >
                  <span className="ff-display text-2xl uppercase tracking-wide md:text-3xl">
                    {faq.question}
                  </span>
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 text-[#d6e86c]">
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p className="border-t border-white/10 p-6 pt-2 text-sm leading-relaxed text-[#9eafa7] md:text-base">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}