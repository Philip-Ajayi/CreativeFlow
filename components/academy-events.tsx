"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  X,
  Maximize2,
  CheckCircle,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { upcomingAcademyEvents, AcademyEvent, CaptionContent } from "@/lib/academy-data";

export default function AcademyEvents() {
  const [selectedFlier, setSelectedFlier] = useState<string | null>(null);
  const [activeRegisterEvent, setActiveRegisterEvent] = useState<AcademyEvent | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Helper to render formatted rich text captions
  const renderCaption = (caption: CaptionContent) => {
    return (
      <div className="space-y-4 text-sm leading-relaxed text-[#9eafa7]">
        {caption.paragraphs?.map((p, i) => (
          <p key={i}>{p}</p>
        ))}

        {caption.boldHighlights?.map((bh, i) => (
          <p key={i} className="font-bold text-[#f3f3d9] italic">
            {bh}
          </p>
        ))}

        {caption.bulletPoints && caption.bulletPoints.length > 0 && (
          <ul className="my-3 space-y-1.5 border-l-2 border-[#d6e86c] pl-4">
            {caption.bulletPoints.map((bp, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-[#d6e86c]">•</span>
                <span>{bp}</span>
              </li>
            ))}
          </ul>
        )}

        {caption.numberedSteps && caption.numberedSteps.length > 0 && (
          <ol className="my-3 space-y-2 rounded-xl bg-white/5 p-4 text-xs">
            {caption.numberedSteps.map((step, i) => (
              <li key={i} className="font-mono text-[#d6e86c]">
                {step}
              </li>
            ))}
          </ol>
        )}
      </div>
    );
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setActiveRegisterEvent(null);
    }, 2800);
  };

  return (
    <section id="upcoming-events" className="bg-[#0c3b2e] py-28 text-[#f3f3d9] md:py-40">
      <div className="container-ff">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="ff-mono mb-4 text-[10px] uppercase tracking-[0.3em] text-[#d6e86c]">
             Live & Online Gatherings
            </div>

            <h2 className="ff-display display-md uppercase">
              Upcoming
              <br />
              <span className="ff-serif font-normal text-[#d6e86c]">academy events.</span>
            </h2>
          </div>

          <p className="max-w-sm text-sm text-[#9eafa7]">
            Register directly or preview full event fliers and details below.
          </p>
        </div>

        {/* Events Grid */}
        <div className="space-y-12">
          {upcomingAcademyEvents.map((event: AcademyEvent, index: number) => (
            <motion.article
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#061f18]/80 p-6 md:p-10"
            >
              <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                {/* Flier Thumbnail with Lightbox Trigger */}
                <div className="relative lg:col-span-4">
                  <div className="media-wrap relative aspect-[4/5] overflow-hidden rounded-2xl bg-black/40">
                    <img
                      src={event.flier}
                      alt={event.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <button
                      onClick={() => setSelectedFlier(event.flier)}
                      className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-xs transition-opacity duration-300 group-hover:opacity-100"
                      aria-label="View Flier Fullscreen"
                    >
                      <div className="flex items-center gap-2 rounded-full bg-[#d6e86c] px-4 py-2 text-xs font-bold text-[#061f18]">
                        <Maximize2 size={14} />
                        View Full Flier
                      </div>
                    </button>
                  </div>
                </div>

                {/* Event Details & Rich Caption */}
                <div className="flex flex-col justify-between lg:col-span-8">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="ff-mono rounded-full bg-[#d6e86c]/20 px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-[#d6e86c]">
                        {event.category}
                      </span>
                      <span className="ff-mono text-[10px] text-[#9eafa7]">
                        {event.date}
                      </span>
                    </div>

                    <h3 className="ff-display mt-4 text-3xl uppercase tracking-tight md:text-5xl">
                      {event.title}
                    </h3>

                    <div className="mt-5 flex flex-wrap gap-6 text-xs text-[#d6e86c]/90">
                      <div className="flex items-center gap-2">
                        <Clock size={15} />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={15} />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    <div className="my-6 border-t border-white/10 pt-6">
                      <div className="ff-mono mb-3 text-[10px] uppercase tracking-widest text-[#d6e86c]">
                        Event Overview & Highlights
                      </div>
                      {renderCaption(event.caption)}
                    </div>
                  </div>

                  {/* CTA Actions */}
                  <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-white/10 pt-6">
                    {event.registrationType === "external" ? (
                      <a
                        href={event.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ff-button ff-button-primary"
                      >
                        <span>Register via External Link</span>
                        <ExternalLink size={15} />
                      </a>
                    ) : (
                      <button
                        onClick={() => setActiveRegisterEvent(event)}
                        className="ff-button ff-button-primary"
                      >
                        <span>Reserve Spot (Dynamic Form)</span>
                        <ArrowUpRight size={16} />
                      </button>
                    )}

                    <button
                      onClick={() => setSelectedFlier(event.flier)}
                      className="ff-button border border-white/20 bg-white/5 text-[#f3f3d9]"
                    >
                      <span>Expand Poster</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* --------------------------------------------------
          1. FLIER LIGHTBOX MODAL
      -------------------------------------------------- */}
      <AnimatePresence>
        {selectedFlier && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedFlier(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] max-w-2xl overflow-hidden rounded-2xl border border-white/20 bg-[#061f18]"
            >
              <button
                onClick={() => setSelectedFlier(null)}
                className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-black/60 text-white backdrop-blur-md hover:bg-black"
              >
                <X size={20} />
              </button>

              <img
                src={selectedFlier}
                alt="Event Flier Full View"
                className="max-h-[85vh] w-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --------------------------------------------------
          2. DYNAMIC REGISTRATION FORM MODAL
      -------------------------------------------------- */}
      <AnimatePresence>
        {activeRegisterEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative my-8 w-full max-w-xl rounded-[2rem] border border-white/15 bg-[#061f18] p-6 md:p-10 text-[#f3f3d9]"
            >
              <button
                onClick={() => setActiveRegisterEvent(null)}
                className="absolute right-6 top-6 grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 hover:bg-white/10"
              >
                <X size={18} />
              </button>

              {formSubmitted ? (
                <div className="py-12 text-center">
                  <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full bg-[#d6e86c] text-[#061f18]">
                    <CheckCircle size={36} />
                  </div>
                  <h3 className="ff-display text-4xl uppercase text-[#d6e86c]">
                    You're Registered!
                  </h3>
                  <p className="mt-3 text-sm text-[#9eafa7]">
                    We've saved your spot for <span className="text-white">{activeRegisterEvent.title}</span>. Check your inbox for access details.
                  </p>
                </div>
              ) : (
                <>
                  <div className="ff-mono mb-2 text-[9px] uppercase tracking-[0.2em] text-[#d6e86c]">
                    Event Registration
                  </div>

                  <h3 className="ff-display text-3xl uppercase leading-tight md:text-4xl">
                    {activeRegisterEvent.title}
                  </h3>

                  <div className="mt-2 text-xs text-[#9eafa7]">
                    {activeRegisterEvent.date} · {activeRegisterEvent.time}
                  </div>

                  <form onSubmit={handleFormSubmit} className="mt-8 space-y-4">
                    {activeRegisterEvent.dynamicFields?.map((field) => (
                      <div key={field.id} className="space-y-1.5">
                        <label htmlFor={field.id} className="block ff-mono text-[10px] uppercase tracking-wider text-[#9eafa7]">
                          {field.label} {field.required && <span className="text-[#d6e86c]">*</span>}
                        </label>

                        {field.type === "select" ? (
                          <select
                            id={field.id}
                            required={field.required}
                            className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-[#f3f3d9] focus:border-[#d6e86c] focus:outline-none"
                          >
                            <option value="" className="bg-[#061f18]">Select option...</option>
                            {field.options?.map((opt) => (
                              <option key={opt} value={opt} className="bg-[#061f18]">
                                {opt}
                              </option>
                            ))}
                          </select>
                        ) : field.type === "textarea" ? (
                          <textarea
                            id={field.id}
                            required={field.required}
                            rows={3}
                            placeholder={field.placeholder}
                            className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-[#f3f3d9] focus:border-[#d6e86c] focus:outline-none"
                          />
                        ) : (
                          <input
                            id={field.id}
                            type={field.type}
                            required={field.required}
                            placeholder={field.placeholder}
                            className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-[#f3f3d9] focus:border-[#d6e86c] focus:outline-none"
                          />
                        )}
                      </div>
                    ))}

                    <button
                      type="submit"
                      className="ff-button ff-button-primary mt-6 w-full justify-center"
                    >
                      <span>Complete Registration</span>
                      <Sparkles size={16} />
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}