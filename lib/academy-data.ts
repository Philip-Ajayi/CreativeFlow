// lib/academy-data.ts

export interface DynamicField {
  id: string;
  label: string;
  type: "text" | "email" | "tel" | "select" | "textarea";
  placeholder?: string;
  required?: boolean;
  options?: string[];
}

export interface CaptionContent {
  paragraphs?: string[];
  boldHighlights?: string[];
  bulletPoints?: string[];
  numberedSteps?: string[];
}

export interface AcademyEvent {
  id: string;
  title: string;
  category: "Workshop" | "Webinar" | "BookChat" | "Mentorship";
  date: string;
  time: string;
  location: string;
  flier: string;
  registrationType: "external" | "dynamic_form";
  externalUrl?: string;
  dynamicFields?: DynamicField[];
  caption: CaptionContent;
}

export interface AcademyProgram {
  id: string;
  title: string;
  tagline: string;
  targetAudience: string;
  description: string;
  image: string;
  highlights: string[];
  badge: string;
}


export const academyPrograms: AcademyProgram[] = [
  {
    id: "let-words-flow",
    title: "Let Words Flow",
    tagline: "Creative Writing for Young Minds",
    targetAudience: "Ages 14–18 / High Schoolers",
    description:
      "Interactive creative writing workshops introducing young learners and high school students to the transformative craft of storytelling, character development, and spoken word poetry.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
    highlights: ["Storytelling Fundamentals", "Poetry & Rhythm", "Peer Critique"],
    badge: "Youth Edition",
  },
  {
    id: "words-flow-now",
    title: "Words Flow Now",
    tagline: "Online Writing Intensive",
    targetAudience: "Beginners & Intermediate Writers (Ages 18–40)",
    description:
      "Virtual creative writing cohorts built for aspiring writers embarking on their literary voyage or mid-level authors seeking to sharpen their narrative voice and structure.",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1200&auto=format&fit=crop",
    highlights: ["Live Feedback Sessions", "Genre Exploration", "Publishing Guidance"],
    badge: "Online Cohort",
  },
  {
    id: "freeflow-bookchat",
    title: "FreeFlow BookChat",
    tagline: "Literary Conversations & Community",
    targetAudience: "All Book Lovers & Thinkers",
    description:
      "Vibrant community gatherings exploring groundbreaking literature, engaging in intimate Q&A sessions with contemporary authors, and uncovering the deep human stories behind the books.",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200&auto=format&fit=crop",
    highlights: ["Author Q&A", "Monthly Book Selection", "Community Circles"],
    badge: "Community",
  },
  {
    id: "cre8ive-webinars",
    title: "Cre8ive Webinars",
    tagline: "Free Knowledge Sharing",
    targetAudience: "Creatives & Non-Creatives Alike",
    description:
      "Open-access digital masterclasses sharing actionable creative principles, brand building, and industry knowledge at zero cost.",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop",
    highlights: ["100% Free Access", "Industry Insights", "Live Q&A"],
    badge: "Free Access",
  },
  {
    id: "mentorship",
    title: "One-on-One & Group Mentorship",
    tagline: "Hands-on Technical & Creative Mastery",
    targetAudience: "Aspiring Professionals (Ages 18–40)",
    description:
      "Intensive, highly specialized coaching spanning Creative Writing, Professional Editing, High-Impact Video Editing, and Graphic Design tailored to accelerate creative careers.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
    highlights: ["Creative Writing", "Editorial Skills", "Video & Graphic Design"],
    badge: "Intensive",
  },
  {
    id: "partnerships",
    title: "School & Institutional Partnerships",
    tagline: "Empowering Next-Gen Institutions",
    targetAudience: "Schools, Universities & Non-Profits",
    description:
      "Tailor-made collaborative curricula and experiential creative residency programs designed to infuse storytelling, design thinking, and arts education into school environments.",
    image:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200&auto=format&fit=crop",
    highlights: ["Custom Curriculum", "On-site Workshops", "Faculty Training"],
    badge: "Institutional",
  },
];

export const upcomingAcademyEvents: AcademyEvent[] = [
  {
    id: "evt-01",
    title: "Unlocking Your Story: Creative Writing Masterclass",
    category: "Workshop",
    date: "OCTOBER 18, 2026",
    time: "4:00 PM - 6:30 PM WAT",
    location: "FreeFlow Studio & Zoom Live",
    flier:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop",
    registrationType: "dynamic_form",
    dynamicFields: [
      { id: "fullName", label: "Full Name", type: "text", placeholder: "e.g. Alex Johnson", required: true },
      { id: "email", label: "Email Address", type: "email", placeholder: "alex@example.com", required: true },
      { id: "ageGroup", label: "Age Group", type: "select", options: ["14–18", "19–25", "26–35", "36–40+"], required: true },
      { id: "experience", label: "Writing Experience Level", type: "select", options: ["Absolute Beginner", "Intermediate", "Published Author"], required: true },
      { id: "motivation", label: "What do you hope to gain from this workshop?", type: "textarea", placeholder: "Tell us about your writing goals...", required: false },
    ],
    caption: {
      paragraphs: [
        "Ready to step into your voice? Join us for an immersive 2.5-hour workshop designed to help you transform abstract ideas into captivating prose.",
        "Whether you are crafting short stories, essays, or novel chapters, this intensive session provides direct guidance from seasoned authors.",
      ],
      boldHighlights: [
        "Key Takeaways: Interactive prompt exercises, live peer feedback, and manuscript structuring tips.",
      ],
      bulletPoints: [
        "Interactive storytelling mechanics & plot mapping",
        "Overcoming writer's block using sensory exercises",
        "Exclusive guide on submitting manuscripts to FreeFlow Publishing",
      ],
      numberedSteps: [
        "Step 1: Complete the registration form below.",
        "Step 2: Receive your confirmation email and preparation guide.",
        "Step 3: Join live on-site or online!",
      ],
    },
  },
  {
    id: "evt-02",
    title: "Visual Storytelling: Graphic Design & Video Editing 101",
    category: "Webinar",
    date: "NOVEMBER 05, 2026",
    time: "6:00 PM WAT",
    location: "Free Flow YouTube / Zoom Webinar",
    flier:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1000&auto=format&fit=crop",
    registrationType: "external",
    externalUrl: "https://eventbrite.com",
    caption: {
      paragraphs: [
        "In this free open webinar, FreeFlow's creative lead will break down key principles of graphic design and video editing for modern content creators.",
      ],
      boldHighlights: [
        "Open for all skill levels — zero premium software required to start!",
      ],
      bulletPoints: [
        "Typography hierarchy and color theory that sells",
        "Fast-paced video editing techniques for short-form video",
        "Q&A session with industry creative directors",
      ],
    },
  },
  {
    id: "evt-03",
    title: "FreeFlow BookChat: Debunking Modern African Fiction",
    category: "BookChat",
    date: "NOVEMBER 21, 2026",
    time: "5:00 PM WAT",
    location: "FreeFlow Cultural Hub, Victoria Island",
    flier:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1000&auto=format&fit=crop",
    registrationType: "dynamic_form",
    dynamicFields: [
      { id: "fullName", label: "Full Name", type: "text", placeholder: "e.g. Maya Lin", required: true },
      { id: "email", label: "Email Address", type: "email", placeholder: "maya@example.com", required: true },
      { id: "phone", label: "WhatsApp / Phone Number", type: "tel", placeholder: "+234...", required: true },
      { id: "favoriteBook", label: "Favorite Book of 2026?", type: "text", placeholder: "Name of book & author", required: false },
    ],
    caption: {
      paragraphs: [
        "Our monthly BookChat returns! This month we delve deep into contemporary fiction, non-fiction narratives, and the craft behind African storytelling.",
      ],
      bulletPoints: [
        "Complimentary refreshments provided",
        "Author book signing opportunity",
        "Networking with fellow literary enthusiasts",
      ],
    },
  },
];