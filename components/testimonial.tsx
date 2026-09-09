"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { testimonials } from "@/lib/data";

export default function Testimonial() {
  const testimonial = testimonials[0];

  return (
    <section className="relative overflow-hidden bg-[#d6e86c] py-28 text-[#061f18] md:py-40">
      <div className="absolute right-[-10%] top-[-20%] h-[600px] w-[600px] rounded-full border border-[#0c3b2e]/10" />

      <div className="container-ff relative">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-2">
            <div className="grid h-12 w-12 place-items-center rounded-full border border-[#0c3b2e]/20">
              <Quote size={20} />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-9"
          >
            <p className="ff-display text-4xl uppercase leading-[.94] tracking-[-.05em] md:text-7xl">
              “{testimonial.quote}”
            </p>

            <div className="mt-10 flex items-center gap-4">
              <div className="h-px w-12 bg-[#0c3b2e]/30" />

              <div>
                <div className="text-sm font-bold">{testimonial.name}</div>
                <div className="ff-mono mt-1 text-[8px] uppercase tracking-[.2em] opacity-50">
                  {testimonial.role}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}