"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/data";

export default function AcademyCTA() {
  return (
    <section className="bg-[#d6e86c] py-28 text-[#061f18] md:py-36">
      <div className="container-ff">
        <div className="grid gap-10 md:grid-cols-12 md:items-center">
          <div className="md:col-span-8">
            <span className="ff-mono text-[10px] uppercase tracking-[0.3em] opacity-60">
              Ready to embark on your creative journey?
            </span>

            <h2 className="ff-display mt-4 text-6xl uppercase leading-[0.82] tracking-[-0.07em] md:text-[8rem]">
              Join the
              <br />
              <span className="ff-serif font-normal text-[#0c3b2e]">Academy flow.</span>
            </h2>
          </div>

          <div className="flex flex-col items-start gap-6 md:col-span-4 md:items-end">
            <p className="max-w-sm text-sm leading-relaxed opacity-75 md:text-right">
              Whether you are an aspiring 14-year-old poet, a 30-year-old video editor, or an institution seeking collaborative workshops, we welcome your voice.
            </p>

            <a
              href={`mailto:${site?.email ?? "hello@ffch.com"}?subject=Academy Enquiry`}
              className="ff-button ff-button-dark"
            >
              <span>Get in touch with us</span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}