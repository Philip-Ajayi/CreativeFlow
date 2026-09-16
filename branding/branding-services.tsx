"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Eye,
  Compass,
  Lightbulb,
  PenTool,
} from "lucide-react";

const services = [
  {
    number: "01",
    icon: Eye,
    title: "Visual\nCommunication",
    description:
      "Crafting cohesive visuals that tell your brand's story at a glance.",
    items: [
      "Visual language",
      "Art direction",
      "Creative systems",
      "Brand applications",
    ],
  },
  {
    number: "02",
    icon: Compass,
    title: "Brand Strategy\n& Identity Design",
    description:
      "Defining who you are and translating it into a distinct and memorable identity.",
    items: [
      "Brand positioning",
      "Identity direction",
      "Audience thinking",
      "Identity systems",
    ],
  },
  {
    number: "03",
    icon: Lightbulb,
    title: "Creative\nConsultation",
    description:
      "Expert guidance to sharpen your creative direction and brand decisions.",
    items: [
      "Creative direction",
      "Brand reviews",
      "Concept development",
      "Decision support",
    ],
  },
  {
    number: "04",
    icon: PenTool,
    title: "Logo / Typography\n/ Guidelines",
    description:
      "Custom logos and style guides that keep your brand consistent everywhere it shows up.",
    items: [
      "Logo design",
      "Typography systems",
      "Colour direction",
      "Brand guidelines",
    ],
  },
];

export default function BrandingServices() {
  return (
    <section
      id="branding-services"
      className="relative overflow-hidden bg-[#f3f3d9] py-28 text-[#0c3b2e] md:py-40"
    >
      <div className="container-ff">
        <div className="mb-20 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <div className="ff-mono mb-5 text-[10px] uppercase tracking-[.3em] opacity-50">
              01 / What we create
            </div>

            <h2 className="ff-display display-lg uppercase">
              A brand is
              <br />
              <span className="ff-serif font-normal">more than</span>
              <br />
              a logo.
            </h2>
          </div>

          <p className="max-w-md self-end text-base leading-relaxed opacity-60 md:col-span-4 md:col-start-9">
            Your brand is the feeling people leave with. We build the strategy,
            identity and visual tools that make that feeling intentional.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {services.map((service, index) => {
            const Icon = service.icon;
            const words = service.title.split("\n");

            return (
              <motion.article
                key={service.number}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -8 }}
                className="group relative min-h-[470px] overflow-hidden rounded-[2rem] border border-[#0c3b2e]/10 bg-[#0c3b2e] p-7 text-[#f3f3d9] md:p-10"
              >
                <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#1ba05c]/20 blur-[70px] transition duration-700 group-hover:bg-[#d6e86c]/20" />

                <div className="relative z-10 flex items-center justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-white/[.04]">
                    <Icon size={20} strokeWidth={1.3} />
                  </div>

                  <span className="ff-mono text-[9px] text-[#d6e86c]">
                    {service.number}
                  </span>
                </div>

                <div className="relative z-10 mt-28">
                  <h3 className="ff-display text-4xl uppercase leading-[.82] tracking-[-.06em] md:text-6xl">
                    {words.map((word, wordIndex) => (
                      <span
                        key={word}
                        className={
                          wordIndex === words.length - 1
                            ? "text-[#d6e86c]"
                            : "block"
                        }
                      >
                        {word}
                      </span>
                    ))}
                  </h3>

                  <p className="mt-7 max-w-md text-sm leading-relaxed text-[#9eafa7] md:text-base">
                    {service.description}
                  </p>
                </div>

                <ul className="relative z-10 mt-8 grid grid-cols-2 border-t border-white/10">
                  {service.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 border-b border-r border-white/10 py-3 text-xs text-[#f3f3d9]/65 last:border-r-0"
                    >
                      <span className="h-1 w-1 rounded-full bg-[#d6e86c]" />
                      {item}
                    </li>
                  ))}
                </ul>

                <ArrowUpRight
                  size={22}
                  className="absolute bottom-8 right-8 text-[#d6e86c] opacity-40 transition duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:opacity-100"
                />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}