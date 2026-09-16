import type { Metadata } from "next";
import BrandingHero from "@/components/branding/branding-hero";
import BrandingServices from "@/components/branding/branding-services";
import BrandingProcess from "@/components/branding/branding-process";
import BrandingManifesto from "@/components/branding/branding-manifesto";
import BrandingCTA from "@/components/branding/branding-cta";

export const metadata: Metadata = {
  title: "Cre8ive Branding — FreeFlow Creative Hub",
  description:
    "Strategic branding, visual identity and creative direction for entrepreneurs, artists and creative brands.",
};

export default function BrandingPage() {
  return (
    <>
      <BrandingHero />
      <BrandingServices />
      <BrandingProcess />
      <BrandingManifesto />
      <BrandingCTA />
    </>
  );
}