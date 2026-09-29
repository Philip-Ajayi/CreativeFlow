import type { Metadata } from "next";
import SubmitHero from "@/components/submit-hero";
import SubmitCategories from "@/components/submit-categories";
import SubmitGuidelines from "@/components/submit-guidelines";
import SubmitForm from "@/components/submit-form";

export const metadata: Metadata = {
  title: "Submit to the Journal — FreeFlow Creative Hub",
  description:
    "We are looking for short stories, poetry, and creative nonfiction pieces that surprise us. Submit your work to the FreeFlow Journal.",
};

export default function SubmitPage() {
  return (
    <>
      <SubmitHero />

      <SubmitCategories />

      <SubmitGuidelines />

      <SubmitForm />
    </>
  );
}