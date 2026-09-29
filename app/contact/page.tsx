import ContactHero from "@/components/contact-hero";
import ContactSection from "@/components/contact-section";
import ContactFaq from "@/components/contact-faq";

export const metadata = {
  title: "Contact — FreeFlow Creative Hub",
  description:
    "Start a project, inquire about publishing, join the Cre8ive Academy, or say hello to FreeFlow Creative Hub.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactSection />
      <ContactFaq />
    </>
  );
}