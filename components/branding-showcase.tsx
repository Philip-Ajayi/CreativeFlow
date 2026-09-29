"use client";

import { motion } from "framer-motion";

const showcaseImages = [
  {
    title: "Minimalist Identity",
    category: "Brand Design",
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Typography System",
    category: "Type & Layout",
    src: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Artistic Packaging",
    category: "Visual Identity",
    src: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=1000&auto=format&fit=crop",
  },
];

export default function BrandingShowcase() {
  return (
    <section className="bg-[#d6e86c] py-28 text-[#061f18] md:py-36">
      <div className="container-ff">
        <div className="mb-16">
          <div className="ff-mono mb-5 text-[10px] uppercase tracking-[.3em] opacity-50">
            Selected Works
          </div>
          <h2 className="ff-display display-md uppercase">
            Visuals in
            <br />
            <span className="ff-serif font-normal">action.</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {showcaseImages.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-[2rem] bg-[#061f18]/10"
            >
              <div className="media-wrap aspect-[3/4] w-full overflow-hidden">
                <img
                  src={item.src}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-[#061f18]/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 p-6 flex flex-col justify-end text-[#f3f3d9]">
                <span className="ff-mono text-[9px] uppercase tracking-[.2em] text-[#d6e86c]">
                  {item.category}
                </span>
                <h4 className="ff-display text-2xl uppercase mt-1">
                  {item.title}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}