"use client";

import { motion } from "framer-motion";
import { Eye, Compass, Lightbulb, Layers } from "lucide-react";

const brandingServices = [
  {
    icon: Eye,
    number: "01",
    title: "Visual Communication",
    description:
      "Crafting cohesive visuals that tell your brand's story at a glance across every visual touchpoint.",
    image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    icon: Compass,
    number: "02",
    title: "Brand Strategy & Identity Design",
    description:
      "Defining who you are and translating it into a distinct, memorable, and enduring visual identity.",
    image: "https://images.unsplash.com/photo-1542744094-3a3172720182?q=80&w=1200&auto=format&fit=crop",
  },
  {
    icon: Lightbulb,
    number: "03",
    title: "Creative Consultation",
    description:
      "Expert guidance to sharpen your creative direction, clarify positioning, and guide sound brand decisions.",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1200&auto=format&fit=crop",
  },
  {
    icon: Layers,
    number: "04",
    title: "Logo, Typography & Guidelines",
    description:
      "Custom logos, bespoke typography suites, and thorough style guides that keep your brand consistent everywhere.",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function BrandingServices() {
  return (
    <section className="bg-[#061f18] py-28 md:py-40">
      <div className="container-ff">
        <div className="mb-20">
          <div className="ff-mono mb-5 text-[10px] uppercase tracking-[.3em] text-[#d6e86c]">
            Core Offerings
          </div>
          <h2 className="ff-display display-lg uppercase">
            Built for
            <br />
            <span className="ff-serif font-normal text-[#d6e86c]">
              impact.
            </span>
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {brandingServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group overflow-hidden rounded-[2rem] border border-white/10 bg-[#0c3b2e]/60 flex flex-col justify-between"
              >
                <div className="media-wrap aspect-[16/9] w-full overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="p-8 md:p-10 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <Icon size={28} className="text-[#d6e86c]" />
                      <span className="ff-mono text-[10px] text-[#9eafa7]">
                        {service.number}
                      </span>
                    </div>

                    <h3 className="ff-display text-3xl uppercase leading-tight md:text-4xl text-[#f3f3d9]">
                      {service.title}
                    </h3>

                    <p className="mt-4 text-sm leading-relaxed text-[#9eafa7]">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}