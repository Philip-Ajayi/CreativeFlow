"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Send, Paperclip, AlertCircle } from "lucide-react";

export default function PublishingForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    referralSource: "",
    workingTitle: "",
    genre: "fiction",
    oneLineDescription: "",
    manuscriptStage: "first draft",
    wordOrPageCount: "",
    services: [] as string[],
    targetTimeline: "",
    anythingElse: "",
  });

  const genres = [
    { value: "fiction", label: "Fiction" },
    { value: "non-fiction", label: "Non-Fiction" },
    { value: "poetry", label: "Poetry" },
    { value: "childrens", label: "Children's" },
    { value: "memoir", label: "Memoir" },
    { value: "other", label: "Other" },
  ];

  const manuscriptStages = [
    { value: "idea stage", label: "Idea stage" },
    { value: "first draft", label: "First draft" },
    { value: "completed draft", label: "Completed draft" },
    {
      value: "previously published, seeking reissue",
      label: "Previously published, seeking reissue",
    },
  ];

  const availableServices = [
    "Editing",
    "Book Design and Layout",
    "Full Production",
    "Author Coaching",
    "Distribution and Platform Access",
    "Not sure yet",
  ];

  const handleInputChange = (
    e: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => {
      const exists = prev.services.includes(service);
      return {
        ...prev,
        services: exists
          ? prev.services.filter((s) => s !== service)
          : [...prev.services, service],
      };
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setFileName(file.name);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const payload = new FormData();
      payload.append("fullName", formData.fullName);
      payload.append("email", formData.email);
      payload.append("phone", formData.phone);
      payload.append("location", formData.location);
      payload.append("referralSource", formData.referralSource);
      payload.append("workingTitle", formData.workingTitle);
      payload.append("genre", formData.genre);
      payload.append("oneLineDescription", formData.oneLineDescription);
      payload.append("manuscriptStage", formData.manuscriptStage);
      payload.append("wordOrPageCount", formData.wordOrPageCount);
      payload.append("services", JSON.stringify(formData.services));
      payload.append("targetTimeline", formData.targetTimeline);
      payload.append("anythingElse", formData.anythingElse);

      if (selectedFile) {
        payload.append("file", selectedFile);
      }

      const res = await fetch("/api/publish", {
        method: "POST",
        body: payload,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.error || "Failed to submit request. Please try again."
        );
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMessage(
        err.message || "An unexpected error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="submit-manuscript" className="bg-[#061f18] py-28 md:py-40">
      <div className="container-ff max-w-5xl">
        <div className="mb-14">
          <span className="ff-mono mb-4 block text-[10px] uppercase tracking-[.3em] text-[#d6e86c]">
            Manuscript Submission
          </span>

          <h2 className="ff-display display-lg uppercase text-[#f3f3d9]">
            Submit your
            <br />
            <span className="ff-serif font-normal text-[#d6e86c]">
              project.
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#9eafa7] md:text-lg">
            Tell us about your book and where you are in the process. We'll
            follow up within a few days to talk next steps.
          </p>
        </div>

        <div className="rounded-[2.5rem] border border-white/10 bg-[#0c3b2e]/60 p-6 backdrop-blur-xl md:p-12">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-16 text-center"
              >
                <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full bg-[#d6e86c]/10 text-[#d6e86c]">
                  <CheckCircle2 size={48} />
                </div>

                <h3 className="ff-display text-4xl uppercase text-[#f3f3d9] md:text-6xl">
                  Submission Received
                </h3>

                <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#9eafa7] md:text-lg">
                  Thank you for trusting us with your story. Our publishing
                  team will review your submission and reach out soon.
                </p>

                <button
                  onClick={() => {
                    setSubmitted(false);
                    setSelectedFile(null);
                    setFileName(null);
                    setFormData({
                      fullName: "",
                      email: "",
                      phone: "",
                      location: "",
                      referralSource: "",
                      workingTitle: "",
                      genre: "fiction",
                      oneLineDescription: "",
                      manuscriptStage: "first draft",
                      wordOrPageCount: "",
                      services: [],
                      targetTimeline: "",
                      anythingElse: "",
                    });
                  }}
                  className="ff-button ff-button-primary mt-10"
                >
                  <span>Submit another manuscript</span>
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubmit}
                className="space-y-12"
              >
                {errorMessage && (
                  <div className="flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-200">
                    <AlertCircle size={20} className="shrink-0" />
                    <span className="text-sm">{errorMessage}</span>
                  </div>
                )}

                {/* Section 1 — About you */}
                <div className="space-y-6">
                  <div className="border-b border-white/10 pb-3">
                    <h3 className="ff-mono text-xs uppercase tracking-[0.25em] text-[#d6e86c]">
                      Section 1 — About you
                    </h3>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="ff-mono mb-2 block text-[10px] uppercase tracking-wider text-[#9eafa7]">
                        Full name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3.5 text-sm text-[#f3f3d9] placeholder-white/20 transition focus:border-[#d6e86c] focus:outline-none focus:ring-1 focus:ring-[#d6e86c]"
                      />
                    </div>

                    <div>
                      <label className="ff-mono mb-2 block text-[10px] uppercase tracking-wider text-[#9eafa7]">
                        Email address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3.5 text-sm text-[#f3f3d9] placeholder-white/20 transition focus:border-[#d6e86c] focus:outline-none focus:ring-1 focus:ring-[#d6e86c]"
                      />
                    </div>

                    <div>
                      <label className="ff-mono mb-2 block text-[10px] uppercase tracking-wider text-[#9eafa7]">
                        Phone number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 000-0000"
                        className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3.5 text-sm text-[#f3f3d9] placeholder-white/20 transition focus:border-[#d6e86c] focus:outline-none focus:ring-1 focus:ring-[#d6e86c]"
                      />
                    </div>

                    <div>
                      <label className="ff-mono mb-2 block text-[10px] uppercase tracking-wider text-[#9eafa7]">
                        Where are you based? (city, country) *
                      </label>
                      <input
                        type="text"
                        name="location"
                        required
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="e.g. Lagos, Nigeria"
                        className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3.5 text-sm text-[#f3f3d9] placeholder-white/20 transition focus:border-[#d6e86c] focus:outline-none focus:ring-1 focus:ring-[#d6e86c]"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="ff-mono mb-2 block text-[10px] uppercase tracking-wider text-[#9eafa7]">
                        How did you hear about us?
                      </label>
                      <input
                        type="text"
                        name="referralSource"
                        value={formData.referralSource}
                        onChange={handleInputChange}
                        placeholder="social media, referral, event, etc."
                        className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3.5 text-sm text-[#f3f3d9] placeholder-white/20 transition focus:border-[#d6e86c] focus:outline-none focus:ring-1 focus:ring-[#d6e86c]"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2 — About your book */}
                <div className="space-y-6">
                  <div className="border-b border-white/10 pb-3">
                    <h3 className="ff-mono text-xs uppercase tracking-[0.25em] text-[#d6e86c]">
                      Section 2 — About your book
                    </h3>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="ff-mono mb-2 block text-[10px] uppercase tracking-wider text-[#9eafa7]">
                        Working title of your book *
                      </label>
                      <input
                        type="text"
                        name="workingTitle"
                        required
                        value={formData.workingTitle}
                        onChange={handleInputChange}
                        placeholder="Title or working name"
                        className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3.5 text-sm text-[#f3f3d9] placeholder-white/20 transition focus:border-[#d6e86c] focus:outline-none focus:ring-1 focus:ring-[#d6e86c]"
                      />
                    </div>

                    <div>
                      <label className="ff-mono mb-2 block text-[10px] uppercase tracking-wider text-[#9eafa7]">
                        Genre *
                      </label>
                      <select
                        name="genre"
                        value={formData.genre}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-white/15 bg-[#082a21] px-4 py-3.5 text-sm text-[#f3f3d9] transition focus:border-[#d6e86c] focus:outline-none focus:ring-1 focus:ring-[#d6e86c]"
                      >
                        {genres.map((g) => (
                          <option key={g.value} value={g.value}>
                            {g.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="ff-mono mb-2 block text-[10px] uppercase tracking-wider text-[#9eafa7]">
                        One-line description of your book: *
                      </label>
                      <input
                        type="text"
                        name="oneLineDescription"
                        required
                        value={formData.oneLineDescription}
                        onChange={handleInputChange}
                        placeholder="In a sentence, what is your book about?"
                        className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3.5 text-sm text-[#f3f3d9] placeholder-white/20 transition focus:border-[#d6e86c] focus:outline-none focus:ring-1 focus:ring-[#d6e86c]"
                      />
                    </div>

                    <div>
                      <label className="ff-mono mb-2 block text-[10px] uppercase tracking-wider text-[#9eafa7]">
                        What stage is your manuscript at? *
                      </label>
                      <select
                        name="manuscriptStage"
                        value={formData.manuscriptStage}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-white/15 bg-[#082a21] px-4 py-3.5 text-sm text-[#f3f3d9] transition focus:border-[#d6e86c] focus:outline-none focus:ring-1 focus:ring-[#d6e86c]"
                      >
                        {manuscriptStages.map((s) => (
                          <option key={s.value} value={s.value}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="ff-mono mb-2 block text-[10px] uppercase tracking-wider text-[#9eafa7]">
                        Estimated word count or page count *
                      </label>
                      <input
                        type="text"
                        name="wordOrPageCount"
                        required
                        value={formData.wordOrPageCount}
                        onChange={handleInputChange}
                        placeholder="e.g. 45,000 words / 180 pages"
                        className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3.5 text-sm text-[#f3f3d9] placeholder-white/20 transition focus:border-[#d6e86c] focus:outline-none focus:ring-1 focus:ring-[#d6e86c]"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 3 — What you need */}
                <div className="space-y-6">
                  <div className="border-b border-white/10 pb-3">
                    <h3 className="ff-mono text-xs uppercase tracking-[0.25em] text-[#d6e86c]">
                      Section 3 — What you need
                    </h3>
                  </div>

                  <div>
                    <label className="ff-mono mb-3 block text-[10px] uppercase tracking-wider text-[#9eafa7]">
                      Which of our services are you interested in?
                    </label>

                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {availableServices.map((service) => {
                        const checked = formData.services.includes(service);
                        return (
                          <label
                            key={service}
                            className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3.5 transition ${
                              checked
                                ? "border-[#d6e86c] bg-[#d6e86c]/10 text-[#d6e86c]"
                                : "border-white/15 bg-white/5 text-[#f3f3d9]/80 hover:border-white/30"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => handleServiceToggle(service)}
                              className="sr-only"
                            />
                            <div
                              className={`grid h-4 w-4 shrink-0 place-items-center rounded border transition ${
                                checked
                                  ? "border-[#d6e86c] bg-[#d6e86c] text-[#061f18]"
                                  : "border-white/30 bg-transparent"
                              }`}
                            >
                              {checked && <CheckCircle2 size={12} />}
                            </div>
                            <span className="text-xs font-semibold">
                              {service}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="ff-mono mb-2 block text-[10px] uppercase tracking-wider text-[#9eafa7]">
                      Do you have a target publishing timeline?
                    </label>
                    <input
                      type="text"
                      name="targetTimeline"
                      value={formData.targetTimeline}
                      onChange={handleInputChange}
                      placeholder="e.g. Next 3–6 months / Flexible / Targeted launch"
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3.5 text-sm text-[#f3f3d9] placeholder-white/20 transition focus:border-[#d6e86c] focus:outline-none focus:ring-1 focus:ring-[#d6e86c]"
                    />
                  </div>
                </div>

                {/* Section 4 — Anything else */}
                <div className="space-y-6">
                  <div className="border-b border-white/10 pb-3">
                    <h3 className="ff-mono text-xs uppercase tracking-[0.25em] text-[#d6e86c]">
                      Section 4 — Anything else
                    </h3>
                  </div>

                  <div>
                    <label className="ff-mono mb-2 block text-[10px] uppercase tracking-wider text-[#9eafa7]">
                      Is there anything else you'd like us to know about your project?
                    </label>
                    <textarea
                      name="anythingElse"
                      rows={4}
                      value={formData.anythingElse}
                      onChange={handleInputChange}
                      placeholder="Tell us about your audience, inspirations, previous experience, or any questions..."
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3.5 text-sm text-[#f3f3d9] placeholder-white/20 transition focus:border-[#d6e86c] focus:outline-none focus:ring-1 focus:ring-[#d6e86c]"
                    />
                  </div>

                  {/* Attachment Enabled */}
                  <div>
                    <label className="ff-mono mb-2 block text-[10px] uppercase tracking-wider text-[#9eafa7]">
                      Attach manuscript sample or pitch document (Optional)
                    </label>
                    <label className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/20 bg-white/5 p-6 transition hover:border-[#d6e86c] hover:bg-white/10">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.txt"
                        onChange={handleFileChange}
                        className="sr-only"
                      />
                      <Paperclip
                        size={24}
                        className="mb-2 text-[#d6e86c] transition group-hover:scale-110"
                      />
                      <span className="text-xs font-bold text-[#f3f3d9]">
                        {fileName
                          ? fileName
                          : "Click to upload manuscript sample or pitch"}
                      </span>
                      <span className="ff-mono mt-1 text-[9px] text-[#9eafa7]">
                        PDF, DOCX, TXT up to 25MB
                      </span>
                    </label>
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="ff-button ff-button-primary w-full text-center md:w-auto"
                  >
                    <span>
                      {loading ? "Sending submission..." : "Send my submission"}
                    </span>
                    <Send size={15} />
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Closing note */}
        <div className="mt-8 text-center">
          <p className="ff-mono text-xs text-[#9eafa7]">
            Thank you for trusting us with your story. Our publishing team will
            review your submission and reach out soon.
          </p>
        </div>
      </div>
    </section>
  );
}