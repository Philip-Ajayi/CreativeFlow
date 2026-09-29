"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, Mail, MapPin, Send, Sparkles } from "lucide-react";
import { site } from "@/lib/data";

const servicesList = [
  "Branding & Identity",
  "Publishing & Books",
  "Cre8ive Academy",
  "General Inquiry",
];

export default function ContactSection() {
  const [selectedService, setSelectedService] = useState<string>("Branding & Identity");
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(site.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form dispatch delay
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <section className="bg-[#f3f3d9] py-24 text-[#0c3b2e] md:py-36">
      <div className="container-ff">
        <div className="grid gap-16 lg:grid-cols-12">
          
          {/* Left Column: Direct Info & Details */}
          <div className="lg:col-span-5">
            <div className="ff-mono mb-5 text-[10px] uppercase tracking-[.3em] opacity-45">
              Contact Details
            </div>

            <h2 className="ff-display text-5xl uppercase leading-[.85] tracking-[-.06em] md:text-7xl">
              We respond
              <br />
              <span className="ff-serif font-normal">in full flow.</span>
            </h2>

            <p className="mt-8 max-w-md text-sm leading-relaxed opacity-65 md:text-base">
              Prefer direct email? Copy our address below or drop us a note in the project form. We typically reply within 24–48 working hours.
            </p>

            {/* Interactive Copy Email Box */}
            <div className="mt-8">
              <button
                onClick={handleCopyEmail}
                className="group flex w-full items-center justify-between rounded-2xl border border-[#0c3b2e]/15 bg-[#0c3b2e]/5 p-4 transition hover:bg-[#0c3b2e] hover:text-[#f3f3d9]"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-[#0c3b2e] text-[#d6e86c] group-hover:bg-[#d6e86c] group-hover:text-[#0c3b2e]">
                    <Mail size={18} />
                  </div>
                  <div className="text-left">
                    <div className="ff-mono text-[9px] uppercase tracking-[.2em] opacity-45 group-hover:text-[#d6e86c]">
                      Direct Mail
                    </div>
                    <div className="font-bold text-sm md:text-base">{site.email}</div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider opacity-60">
                  {copied ? (
                    <>
                      <Check size={16} className="text-[#1ba05c]" />
                      <span className="text-[#1ba05c]">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      <span className="hidden sm:inline">Copy</span>
                    </>
                  )}
                </div>
              </button>
            </div>

            {/* Info Cards */}
            <div className="mt-10 space-y-6 border-t border-[#0c3b2e]/10 pt-8">
              <div className="flex items-start gap-4">
                <MapPin size={20} className="mt-1 shrink-0 opacity-50" />
                <div>
                  <div className="ff-mono text-[9px] uppercase tracking-[.2em] opacity-45">
                    Location
                  </div>
                  <div className="mt-1 font-bold text-base">
                    Ibadan, Nigeria & Remote Worldwide
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Sparkles size={20} className="mt-1 shrink-0 opacity-50" />
                <div>
                  <div className="ff-mono text-[9px] uppercase tracking-[.2em] opacity-45">
                    Working Hours
                  </div>
                  <div className="mt-1 font-bold text-base">
                    Monday — Friday : 9:00 AM – 6:00 PM (WAT)
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-12">
              <div className="ff-mono mb-4 text-[9px] uppercase tracking-[.2em] opacity-45">
                Social Channels
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: "Instagram", url: site.instagram },
                  { name: "LinkedIn", url: site.linkedin },
                  { name: "Facebook", url: site.facebook },
                  { name: "TikTok", url: site.tiktok },
                ].map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 rounded-full border border-[#0c3b2e]/15 px-4 py-2 text-xs font-bold transition hover:bg-[#0c3b2e] hover:text-[#d6e86c]"
                  >
                    <span>{s.name}</span>
                    <ArrowUpRight size={13} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Project Form */}
          <div className="lg:col-span-7">
            <div className="rounded-[2.5rem] bg-[#061f18] p-7 text-[#f3f3d9] md:p-12">
              <div className="ff-mono mb-3 text-[9px] uppercase tracking-[.25em] text-[#d6e86c]">
                Project Intake
              </div>

              <h3 className="ff-display text-4xl uppercase tracking-[-.05em] md:text-5xl">
                Tell us about your project
              </h3>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-12 rounded-2xl border border-[#d6e86c]/20 bg-[#0c3b2e]/40 p-8 text-center"
                >
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#d6e86c] text-[#061f18]">
                    <Check size={32} />
                  </div>
                  <h4 className="ff-display mt-6 text-3xl uppercase tracking-tight text-[#d6e86c]">
                    Message Received!
                  </h4>
                  <p className="mt-3 text-sm leading-relaxed text-[#9eafa7]">
                    Thank you for reaching out. We've received your query regarding{" "}
                    <span className="text-[#f3f3d9] font-semibold">{selectedService}</span> and will reach out shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="ff-button ff-button-primary mt-8"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-10 space-y-8">
                  
                  {/* Service Choice Pills */}
                  <div>
                    <label className="ff-mono block text-[10px] uppercase tracking-[.2em] text-[#9eafa7]">
                      What are you interested in?
                    </label>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {servicesList.map((service) => (
                        <button
                          type="button"
                          key={service}
                          onClick={() => setSelectedService(service)}
                          className={`rounded-full px-4 py-2.5 text-xs font-bold transition ${
                            selectedService === service
                              ? "bg-[#d6e86c] text-[#061f18]"
                              : "border border-white/10 bg-white/5 text-[#f3f3d9] hover:bg-white/10"
                          }`}
                        >
                          {service}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Inputs */}
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label className="ff-mono block text-[10px] uppercase tracking-[.2em] text-[#9eafa7]">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Jane Doe"
                        className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-[#f3f3d9] placeholder-[#9eafa7]/40 outline-none transition focus:border-[#d6e86c]"
                      />
                    </div>

                    <div>
                      <label className="ff-mono block text-[10px] uppercase tracking-[.2em] text-[#9eafa7]">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="jane@example.com"
                        className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-[#f3f3d9] placeholder-[#9eafa7]/40 outline-none transition focus:border-[#d6e86c]"
                      />
                    </div>
                  </div>

                  {/* Message Input */}
                  <div>
                    <label className="ff-mono block text-[10px] uppercase tracking-[.2em] text-[#9eafa7]">
                      Project Details / Notes *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell us about the project goals, timeline, or any specific ideas you have..."
                      className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-[#f3f3d9] placeholder-[#9eafa7]/40 outline-none transition focus:border-[#d6e86c]"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="ff-button ff-button-primary w-full sm:w-auto"
                  >
                    <span>{loading ? "Sending..." : "Submit Project Form"}</span>
                    <Send size={15} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}