// app/academy/page.tsx

import AcademyHero from "@/components/academy-hero";
import AcademyPrograms from "@/components/academy-programs";
import AcademyEvents from "@/components/academy-events";
import AcademyCTA from "@/components/academy-cta";

export const metadata = {
  title: "Cre8ive Academy — FreeFlow Creative Hub",
  description:
    "Interactive creative writing, design, editing workshops, and mentorship for aspiring creatives aged 14–40.",
};

export default function AcademyPage() {
  return (
    <>
      {/* 1. Hero Section with dynamic badges & counters */}
      <AcademyHero />

      {/* 2. Six core programs (Let Words Flow, Words Flow Now, BookChat, Webinars, Mentorship, Partnerships) */}
      <AcademyPrograms />

      {/* 3. Upcoming Events with Full Flier Lightbox, formatted captions, and Dynamic Registration Modal */}
      <AcademyEvents />

      {/* 4. Custom Footer CTA */}
      <AcademyCTA />
    </>
  );
}