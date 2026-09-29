// lib/journal-data.ts

export interface JournalPost {
  id: string;
  title: string;
  summary: string;
  content: string[];
  category: "Branding" | "Publishing" | "Culture" | "Process" | "Academy";
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
}

export const JOURNAL_POSTS: JournalPost[] = [
  {
    id: "ideas-that-move",
    title: "Why Most Brand Identities Fail to Move Beyond the Logo",
    summary:
      "A logo is merely an invitation. Real brand resonance happens in motion, voice, and the space between interactions.",
    content: [
      "When we talk about branding at FreeFlow, we often start by dismantling the myth of the static visual identity. A brand isn't a museum piece—it's a living, breathing system of expression.",
      "In today's fast-paced digital ecosystem, static graphics are easily forgotten. The brands that stay with us are those that move with intention. They have a rhythm to their typography, a purpose behind their motion, and an unmistakable voice in every touchpoint.",
      "To build a brand that endures, you must design for adaptability rather than rigid consistency. Focus on the underlying philosophy first, then let the visual language naturally flow from it."
    ],
    category: "Branding",
    author: {
      name: "FreeFlow Editorial",
      role: "Design & Strategy"
    },
    date: "Sep 24, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    featured: true
  },
  {
    id: "publishing-in-digital-age",
    title: "Tactile Publishing: The Resurgence of the Physical Object",
    summary:
      "In an era dominated by transient digital feeds, physical books are becoming the ultimate luxury artifact.",
    content: [
      "There is something irreplaceable about weight, texture, and paper density. Print is not dead; it has simply evolved from a utility into an intentional experience.",
      "When a manuscript transitions into a physical object, every decision—from paper stock selection to binding geometry—conveys subtle narrative weight. We believe publishing is the deliberate craft of physical permanence."
    ],
    category: "Publishing",
    author: {
      name: "Amara Vance",
      role: "Head of Publishing"
    },
    date: "Sep 18, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop",
    featured: false
  },
  {
    id: "creative-flow-state",
    title: "Engineering the Flow State in Creative Teams",
    summary:
      "How to eliminate friction between imagination and execution without suffocating spontaneous brilliance.",
    content: [
      "Flow isn't accidental—it's engineered. Creative friction often stems from rigid processes that treat design like an assembly line.",
      "By establishing clear constraints early, creative teams gain the freedom to explore wilder ideas safely."
    ],
    category: "Process",
    author: {
      name: "Kofi Mensah",
      role: "Creative Lead"
    },
    date: "Sep 12, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop",
    featured: false
  },
  {
    id: "culture-of-mentorship",
    title: "Cre8ive Academy: Nurturing Next-Gen Design Leaders",
    summary:
      "Why real creative education happens through collaborative dialogue rather than lectures.",
    content: [
      "Education in design must move at the speed of practice. At Cre8ive Academy, we bridge the gap between abstract theory and real-world execution."
    ],
    category: "Academy",
    author: {
      name: "Sarah Jenkins",
      role: "Academy Director"
    },
    date: "Sep 05, 2026",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000&auto=format&fit=crop",
    featured: false
  },
  {
    id: "typography-and-emotion",
    title: "Expressive Typography: Words as Visual Form",
    summary:
      "Exploring how custom typefaces establish raw emotion before a single word is read.",
    content: [
      "Typography is the tone of voice made visible. Selecting the right font family communicates subconscious hierarchy and emotion instantly."
    ],
    category: "Culture",
    author: {
      name: "FreeFlow Design Studio",
      role: "Type Research"
    },
    date: "Aug 29, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?q=80&w=1000&auto=format&fit=crop",
    featured: false
  }
];