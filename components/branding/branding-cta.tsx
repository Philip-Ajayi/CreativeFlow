"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { site } from "@/lib/data";

export default function BrandingCTA() {
  return (
    <section className="relative overflow-hidden bg-[#f3f3d9] py-28 text-[#0c3b2e] md:py-40">
      <div className="absolute right-[-120px] top-[-160px] h-[500px] w-[500px] rounded-full bg-[#d6e86c]/50 blur-[100px]" />

      <div className="absolute bottom-[-180px] left-[-120px] h-[500px] w-[500px] rounded-full bg-[#1ba05c]/15 blur-[100px]" />

      <div className="container-ff relative">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="ff-mono mb-6 flex items-center gap-3 text-[10px] uppercase tracking-[.3em] opacity-50"
            >
              <Mail size={13} />
              Let's build something distinctive
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="ff-display text-6xl uppercase leading-[.78] tracking-[-.08em] md:text-[9rem]"
            >
              Have a
              <br />
              <span className="ff-serif font-normal">brand</span>
              <br />
              to build?
            </motion.h2>
          </div>

          <div className="flex flex-col justify-end md:col-span-4">
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="max-w-md text-base leading-relaxed opacity-60"
            >
              Tell us where you are, where you want to go, and what you're
              trying to make people feel. We'll take it from there.
            </motion.p>

            <motion.a
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              href={`mailto:${site.email}?subject=Cre8ive Branding Enquiry`}
              whileHover={{ y: -5 }}
              className="group mt-8 flex w-fit items-center gap-5 rounded-full bg-[#061f18] px-7 py-4 text-sm font-bold text-[#f3f3d9] shadow-2xl"
            >
              <span>Reach out to us</span>

              <span className="grid h-9 w-9 place-items-center rounded-full bg-[#d6e86c] text-[#061f18] transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight size={17} />
              </span>
            </motion.a>

            <a
              href={`mailto:${site.email}`}
              className="mt-5 w-fit text-xs opacity-50 transition hover:text-[#1ba05c] hover:opacity-100"
            >
              {site.email}
            </a>
          </div>
        </div>

        <div className="mt-20 border-t border-[#0c3b2e]/10 pt-5">
          <div className="flex flex-col justify-between gap-3 text-[9px] uppercase tracking-[.2em] opacity-40 md:flex-row">
            <span>Cre8ive Branding · FreeFlow Creative Hub</span>
            <span>Ideas into identity.</span>
          </div>
        </div>
      </div>
    </section>
  );
}