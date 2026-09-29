"use client";

import { motion } from "framer-motion";
import { BookOpen, Layers, UserCheck, Share2, Check } from "lucide-react";

const publishingServices = [
  {
    number: "01",
    title: "Book Editing, Design & Production",
    subtitle: "From manuscript to finished book",
    description:
      "Polished editing, clean layout, and print-ready design that elevates your raw manuscript into a stunning physical or digital object.",
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=1000",
    features: [
      "Developmental & Line Editing",
      "Interior Layout & Typesetting",
      "Print-Ready & Ebook Cover Design",
    ],
    icon: BookOpen,
  },
  {
    number: "02",
    title: "Media Content Publishing",
    subtitle: "Across platforms and formats",
    description:
      "Turning your ideas into published content adapted across multiple formats, digital channels, and modern media touchpoints.",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1000",
    features: [
      "Multi-Format Content Strategy",
      "Digital Publishing Workflows",
      "Platform-Optimized Formats",
    ],
    icon: Layers,
  },
  {
    number: "03",
    title: "Author Development & Coaching",
    subtitle: "Personalised guidance",
    description:
      "One-on-one mentorship to sharpen your narrative craft, grow your author voice, and build a sustainable career as a writer.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000",
    features: [
      "Writing Craft Coaching",
      "Author Branding & Voice",
      "Publication Strategy",
    ],
    icon: UserCheck,
  },
  {
    number: "04",
    title: "Distribution / Platform Access",
    subtitle: "Getting your work to readers",
    description:
      "Getting your work into readers' hands through targeted channels, online marketplaces, and major digital reading platforms.",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=1000",
    features: [
      "Global Online Distribution",
      "Print-on-Demand Integration",
      "Channel Onboarding Support",
    ],
    icon: Share2,
  },
];

export default function PublishingServices() {
  return (
    <section className="bg-[#f3f3d9] py-28 text-[#0c3b2e] md:py-40">
      <div className="container-ff">
        <div className="mb-20 grid gap-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <span className="ff-mono mb-5 block text-[10px] uppercase tracking-[.3em] opacity-50">
              0Core Publishing Services
            </span>

            <h2 className="ff-display display-lg uppercase">
              Everything your
              <br />
              <span className="ff-serif font-normal">story needs.</span>
            </h2>
          </div>

          <p className="max-w-md self-end text-sm leading-relaxed opacity-70 md:col-span-4">
            Whether you have an outline, a working draft, or a completed manuscript, we partner with authors to bring their creative vision to life.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {publishingServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-[#0c3b2e]/15 bg-[#0c3b2e] p-7 text-[#f3f3d9] md:p-10"
              >
                <div>
                  <div className="media-wrap relative mb-8 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-[#061f18]">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#061f18]/80 via-transparent to-transparent" />
                    <span className="ff-mono absolute left-4 top-4 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[9px] uppercase tracking-widest backdrop-blur-md">
                      {service.number}
                    </span>
                  </div>

                  <div className="mb-3 flex items-center gap-2 text-[#d6e86c]">
                    <Icon size={18} />
                    <span className="ff-mono text-[10px] uppercase tracking-[.2em]">
                      {service.subtitle}
                    </span>
                  </div>

                  <h3 className="ff-display text-3xl uppercase leading-none md:text-4xl">
                    {service.title}
                  </h3>

                  <p className="mt-4 text-sm leading-relaxed text-[#9eafa7]">
                    {service.description}
                  </p>
                </div>

                <div className="mt-8 border-t border-white/10 pt-6">
                  <ul className="space-y-2">
                    {service.features.map((feat) => (
                      <li
                        key={feat}
                        className="flex items-center gap-2.5 text-xs text-[#f3f3d9]/80"
                      >
                        <Check size={14} className="text-[#d6e86c]" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}