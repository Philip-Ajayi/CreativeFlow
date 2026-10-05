"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, ArrowUpRight, Check, FileCheck, Loader2 } from "lucide-react";

export default function SubmitForm() {
  const [file, setFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    category: "Short Stories",
    title: "",
    bio: "",
    simultaneous: false,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setErrorMessage("Please attach a document (.doc or .docx) before submitting.");
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const data = new FormData();
      data.append("fullName", formData.fullName);
      data.append("email", formData.email);
      data.append("category", formData.category);
      data.append("title", formData.title);
      data.append("bio", formData.bio);
      data.append("simultaneous", String(formData.simultaneous));
      data.append("file", file);

      const response = await fetch("/api/submit", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit. Please try again.");
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error("Submission failed:", err);
      setErrorMessage(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="submit-form" className="relative overflow-hidden bg-[#d6e86c] py-28 text-[#061f18] md:py-40">
      <div className="container-ff relative">
        <div className="mx-auto max-w-4xl">
          <div className="mb-14 text-center">
            <span className="ff-mono text-[10px] uppercase tracking-[.3em] opacity-60">
              Ready to send?
            </span>

            <h2 className="ff-display mt-4 text-6xl uppercase leading-[.85] tracking-[-.07em] md:text-[7rem]">
              Submit your
              <br />
              <span className="ff-serif font-normal">work.</span>
            </h2>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-[2.5rem] border border-[#061f18]/15 bg-[#f3f3d9] p-10 text-center md:p-16"
            >
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#0c3b2e] text-[#d6e86c]">
                <Check size={32} />
              </div>

              <h3 className="ff-display mt-8 text-4xl uppercase md:text-6xl">
                Submission Received!
              </h3>

              <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed opacity-75">
                Thank you for sharing your writing with us. We have received
                your piece titled <strong>"{formData.title || "Untitled"}"</strong> and
                will review it within 2–3 weeks.
              </p>

              <button
                onClick={() => {
                  setSubmitted(false);
                  setFile(null);
                  setErrorMessage(null);
                  setFormData({
                    fullName: "",
                    email: "",
                    category: "Short Stories",
                    title: "",
                    bio: "",
                    simultaneous: false,
                  });
                }}
                className="ff-button ff-button-dark mt-10"
              >
                Submit another piece
              </button>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-[2.5rem] border border-[#061f18]/15 bg-[#f3f3d9] p-8 shadow-2xl md:p-14"
            >
              {errorMessage && (
                <div className="mb-6 rounded-2xl bg-red-500/10 p-4 border border-red-500/30 text-red-800 text-sm font-semibold text-center">
                  {errorMessage}
                </div>
              )}

              <div className="grid gap-8 md:grid-cols-2">
                {/* Full Name */}
                <div>
                  <label className="ff-mono mb-2 block text-[10px] uppercase tracking-[.2em] opacity-60">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Maya Angelou"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="w-full rounded-2xl border border-[#061f18]/15 bg-transparent px-5 py-4 text-sm transition focus:border-[#0c3b2e] focus:outline-none"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="ff-mono mb-2 block text-[10px] uppercase tracking-[.2em] opacity-60">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="maya@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full rounded-2xl border border-[#061f18]/15 bg-transparent px-5 py-4 text-sm transition focus:border-[#0c3b2e] focus:outline-none"
                  />
                </div>

                {/* Submission Category */}
                <div>
                  <label className="ff-mono mb-2 block text-[10px] uppercase tracking-[.2em] opacity-60">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full rounded-2xl border border-[#061f18]/15 bg-transparent px-5 py-4 text-sm transition focus:border-[#0c3b2e] focus:outline-none"
                  >
                    <option value="Flash Fiction">Flash Fiction (&lt; 1,000 words)</option>
                    <option value="Short Stories">Short Story (&lt; 3,000 words)</option>
                    <option value="Poetry">Poetry (Up to 5 poems)</option>
                  </select>
                </div>

                {/* Title of Work */}
                <div>
                  <label className="ff-mono mb-2 block text-[10px] uppercase tracking-[.2em] opacity-60">
                    Title of Work *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="The Song of the River"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full rounded-2xl border border-[#061f18]/15 bg-transparent px-5 py-4 text-sm transition focus:border-[#0c3b2e] focus:outline-none"
                  />
                </div>
              </div>

              {/* Third-Person Bio */}
              <div className="mt-8">
                <div className="flex items-center justify-between mb-2">
                  <label className="ff-mono text-[10px] uppercase tracking-[.2em] opacity-60">
                    Third-Person Bio (50 words or less) *
                  </label>
                  <span className="ff-mono text-[9px] opacity-40">
                    {formData.bio.split(/\s+/).filter(Boolean).length}/50 words
                  </span>
                </div>
                <textarea
                  rows={3}
                  required
                  placeholder="Writer based in Lagos. Her stories have previously appeared in..."
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  className="w-full rounded-2xl border border-[#061f18]/15 bg-transparent px-5 py-4 text-sm transition focus:border-[#0c3b2e] focus:outline-none"
                />
              </div>

              {/* File Upload Zone */}
              <div className="mt-8">
                <label className="ff-mono mb-2 block text-[10px] uppercase tracking-[.2em] opacity-60">
                  Attach Document (.doc or .docx) *
                </label>
                <div className="relative rounded-2xl border-2 border-dashed border-[#061f18]/20 bg-black/5 p-8 text-center transition hover:border-[#0c3b2e]">
                  <input
                    type="file"
                    accept=".doc,.docx,.pdf"
                    required
                    onChange={handleFileChange}
                    className="absolute inset-0 cursor-pointer opacity-0"
                  />
                  {file ? (
                    <div className="flex items-center justify-center gap-3 text-[#0c3b2e]">
                      <FileCheck size={24} />
                      <span className="font-bold text-sm">{file.name}</span>
                      <span className="text-xs opacity-50">
                        ({(file.size / 1024).toFixed(1)} KB)
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Upload size={28} className="opacity-40" />
                      <span className="text-xs font-semibold uppercase tracking-[.1em]">
                        Drop your doc / docx file here or click to browse
                      </span>
                      <span className="ff-mono text-[9px] opacity-40">
                        Maximum file size: 10MB
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Simultaneous Submission Checkbox */}
              <div className="mt-8 flex items-center gap-3">
                <input
                  type="checkbox"
                  id="simultaneous"
                  checked={formData.simultaneous}
                  onChange={(e) =>
                    setFormData({ ...formData, simultaneous: e.target.checked })
                  }
                  className="h-4 w-4 rounded border-[#061f18]/20 accent-[#0c3b2e]"
                />
                <label htmlFor="simultaneous" className="text-xs opacity-75">
                  This is a simultaneous submission (I will notify FreeFlow if accepted elsewhere).
                </label>
              </div>

              {/* Action Button */}
              <div className="mt-10 flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="ff-button ff-button-dark w-full md:w-auto disabled:opacity-50"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 size={16} className="animate-spin" />
                      Uploading manuscript...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <span>Submit to Journal</span>
                      <ArrowUpRight size={16} />
                    </span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}