import PublishingHero from "@/components/publishing-hero";
import PublishingServices from "@/components/publishing-services";
import PublishingForm from "@/components/publishing-form";
import Books from "@/components/books";

export const metadata = {
  title: "Cre8ive Publishing — FreeFlow Creative Hub",
  description:
    "Book editing, design, production, author development, coaching, and platform distribution for writers, authors, and content creators.",
};

export default function PublishingPage() {
  return (
    <>
      <PublishingHero />

      <PublishingServices />

      <Books />

      <PublishingForm />

      <section className="bg-[#f3f3d9] py-28 text-[#0c3b2e] md:py-36">
        <div className="container-ff">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-8">
              <span className="ff-mono text-[10px] uppercase tracking-[.3em] opacity-45">
                Ready when you are
              </span>

              <h2 className="ff-display mt-5 text-6xl uppercase leading-[.82] tracking-[-.07em] md:text-[8rem]">
                Bring us
                <br />
                your
                <br />
                <span className="ff-serif font-normal">story.</span>
              </h2>
            </div>

            <div className="flex flex-col justify-end md:col-span-4 md:col-start-9">
              <p className="text-sm leading-relaxed opacity-60">
                Whether you're developing an initial idea or seeking global distribution for a polished manuscript, we'd love to partner with you.
              </p>

              <a
                href="#submit-manuscript"
                className="ff-button ff-button-dark mt-7 w-fit"
              >
                Submit your manuscript
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}