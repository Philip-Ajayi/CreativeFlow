import type { Metadata } from "next";
import BrandingHero from "@/components/branding-hero";
import BrandingServices from "@/components/branding-services";
import BrandingShowcase from "@/components/branding-showcase";
import BrandingProcess from "@/components/branding-process";

export const metadata: Metadata = {
  title: "Cre8ive Branding — FreeFlow Creative Hub",
  description:
    "Crafting cohesive visuals, brand strategies, expert creative consultation, and custom identity systems for entrepreneurs, artists, and creative brands.",
};

export default function BrandingPage() {
  return (
    <>
      <BrandingHero />

      <BrandingServices />

      <BrandingShowcase />

      <BrandingProcess />

      {/* Call To Action Section */}
      <section className="bg-[#f3f3d9] py-28 text-[#0c3b2e] md:py-36">
        <div className="container-ff">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-8">
              <span className="ff-mono text-[10px] uppercase tracking-[.3em] opacity-45">
                Ready to elevate your brand?
              </span>

              <h2 className="ff-display mt-5 text-6xl uppercase leading-[.82] tracking-[-.07em] md:text-[8rem]">
                Shape your
                <br />
                brand’s
                <br />
                <span className="ff-serif font-normal text-[#1ba05c]">future.</span>
              </h2>
            </div>

            <div className="flex flex-col justify-end md:col-span-4 md:col-start-9">
              <p className="text-sm leading-relaxed opacity-65">
                Whether starting from scratch or re-imagining an existing entity, we turn your unique story into an iconic visual brand.
              </p>

              <a
                href="mailto:hello@ffch.com"
                className="ff-button ff-button-dark mt-7 w-fit"
              >
                Start a Branding Project
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}