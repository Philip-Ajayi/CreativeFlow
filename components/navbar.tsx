// components/navbar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Branding", href: "/branding" },
  { name: "Publishing", href: "/publishing" },
  { name: "Academy", href: "/academy" },
  { name: "Journal", href: "/journal" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [menu, setMenu] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (menu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menu]);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;

      if (current > lastScroll && current > 120) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      setLastScroll(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScroll]);

  return (
    <>
      <header
        className={`fixed left-0 top-0 z-[80] w-full px-4 pt-4 transition-transform duration-500 md:px-6 ${
          hidden ? "-translate-y-[120%]" : "translate-y-0"
        }`}
      >
        <nav className="glass-dark mx-auto flex max-w-[1440px] items-center justify-between rounded-full px-4 py-3 md:px-5">
          <Link
            href="/"
            className="flex items-center"
            onClick={() => setMenu(false)}
          >
            <Image
              src="/logo.png"
              alt="FreeFlow Creative Hub"
              width={180}
              height={48}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden items-center gap-6 lg:gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs font-semibold uppercase tracking-[0.16em] text-[#f3f3d9]/70 transition hover:text-[#d6e86c]"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop "Start a project" CTA */}
          <Link
            href="/submit"
            className="hidden items-center gap-2 rounded-full bg-[#d6e86c] px-5 py-3 text-xs font-black uppercase tracking-[0.1em] text-[#061f18] transition hover:-translate-y-0.5 md:flex"
          >
            Start a project
            <ArrowUpRight size={14} />
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMenu(!menu)}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 md:hidden"
            aria-label="Toggle menu"
          >
            {menu ? <X size={19} /> : <Menu size={19} />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[70] h-[100dvh] overflow-y-auto bg-[#061f18] px-7 pb-16 pt-32 transition-all duration-500 md:hidden ${
          menu
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex min-h-full flex-col justify-between">
          {/* Mobile Navigation Links */}
          <div className="space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMenu(false)}
                className="ff-display block text-4xl uppercase leading-none text-[#f3f3d9] sm:text-5xl"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Footer Area with CTA */}
          <div className="mt-10 space-y-6 border-t border-white/10 pt-6">
            <Link
              href="/submit"
              onClick={() => setMenu(false)}
              className="flex w-full items-center justify-between rounded-full bg-[#d6e86c] px-6 py-4 text-xs font-black uppercase tracking-[0.1em] text-[#061f18] transition active:scale-[0.98]"
            >
              <span>Start a project</span>
              <ArrowUpRight size={16} />
            </Link>

            <span className="ff-mono block text-xs uppercase tracking-[0.2em] text-[#9eafa7]">
              Let's make something worth remembering.
            </span>
          </div>
        </div>
      </div>
    </>
  );
}