export type Pillar = "Nest" | "Academy" | "Workshop" | "Wayfinder" | "Studio";
export type Unit = Pillar | "Whisper";

export type Product = {
  id: string;
  title: string;
  pillar?: Pillar;
  unit?: Unit;
  price: number;
  format: string;
  pages: number;
  tag?: string;
  description: string;
};

export const pillars: {
  name: Pillar;
  tagline: string;
  description: string;
  items: string[];
}[] = [
  {
    name: "Nest",
    tagline: "For home, rhythm, and restoration",
    description:
      "Guides and checklists for making a home feel habitable — written for people who need softer systems, not stricter ones.",
    items: ["Home Reset Guides", "Room-by-Room PDFs", "Gentle Systems"],
  },
  {
    name: "Academy",
    tagline: "For learning with depth",
    description:
      "Essays, frameworks, and reading packs that clarify complex ideas without flattening them. Slow knowledge, kept legible.",
    items: ["Teaching PDFs", "Deep-Dive Workbooks", "Research Packs"],
  },
  {
    name: "Workshop",
    tagline: "For making, building, and refining",
    description:
      "Templates, toolkits, and working sheets for shaping something tangible — from a first sketch to a finished thing.",
    items: ["Templates", "Toolkits", "Build Sheets"],
  },
  {
    name: "Wayfinder",
    tagline: "For orientation in nonlinear seasons",
    description:
      "Reflective workbooks and decision maps for transition, uncertainty, and the long quiet stretch between who you were and who you are becoming.",
    items: ["Reflection Guides", "Decision Maps", "Reset PDFs"],
  },
  {
    name: "Studio",
    tagline: "For brand, language, and creative direction",
    description:
      "Editorial tools, writing packs, and strategic PDFs for shaping a body of work with emotional precision and a recognizable voice.",
    items: ["Brand Guides", "Writing Packs", "Strategy PDFs"],
  },
];

export const whisper = {
  name: "Whisper" as const,
  tagline: "For depression, communication, and quiet clarity",
  description:
    "A language system for people who live quietly and those who love them. Cards, guides, and protocols that reduce the cost of explaining what is barely visible.",
  items: ["Code Cards", "Signal Protocols", "Digital Guides"],
};

export const willowProducts: Product[] = [
  {
    id: "nest-edit",
    title: "The Nest Edit",
    pillar: "Nest",
    price: 32,
    format: "PDF Bundle",
    pages: 64,
    tag: "Bestseller",
    description:
      "A layered set of home reset documents for atmosphere, order, and lived-in ease.",
  },
  {
    id: "academy-reader-1",
    title: "Academy Reader Vol. 1",
    pillar: "Academy",
    price: 22,
    format: "PDF Reader",
    pages: 48,
    tag: "New",
    description:
      "A compact digital reader for people who want depth without academic drag.",
  },
  {
    id: "workshop-toolkit",
    title: "Workshop Toolkit",
    pillar: "Workshop",
    price: 29,
    format: "Toolkit",
    pages: 38,
    tag: "Popular",
    description:
      "Templates and working pages that help ideas leave the fog and take form.",
  },
  {
    id: "wayfinder-reset",
    title: "Wayfinder Reset",
    pillar: "Wayfinder",
    price: 26,
    format: "Workbook",
    pages: 42,
    tag: "Essential",
    description:
      "A recalibration workbook for moments of uncertainty, transition, and emotional static.",
  },
  {
    id: "studio-messaging",
    title: "Studio Messaging Maps",
    pillar: "Studio",
    price: 34,
    format: "Strategy PDF",
    pages: 56,
    tag: "Editor's pick",
    description:
      "Frameworks for shaping voice, positioning, and emotional clarity across your work.",
  },
  {
    id: "nest-room-notes",
    title: "Nest Room Notes",
    pillar: "Nest",
    price: 18,
    format: "Mini Guide",
    pages: 24,
    tag: "Small format",
    description:
      "A focused guide for adjusting one room at a time without overhauling everything.",
  },
  {
    id: "workshop-build",
    title: "Workshop Build Sheets",
    pillar: "Workshop",
    price: 16,
    format: "Template Set",
    pages: 18,
    tag: "Utility",
    description:
      "Simple working sheets for sketching, organizing, and refining active projects.",
  },
  {
    id: "wayfinder-decisions",
    title: "Wayfinder Decision Maps",
    pillar: "Wayfinder",
    price: 20,
    format: "Decision PDF",
    pages: 28,
    tag: "Clarity",
    description:
      "A gentle framework for navigating choices when energy and certainty are both limited.",
  },
];

export const whisperProducts: Product[] = [
  {
    id: "whisper-code-cards",
    title: "The Code Cards",
    unit: "Whisper",
    price: 45,
    format: "Card Set Bundle",
    pages: 0,
    tag: "Core product",
    description:
      "Two decks: signals for the person, readings for those who love them. Bone paper, Willow Green ink, Cormorant Garamond.",
  },
  {
    id: "whisper-messages",
    title: "Messages That Cost Less",
    unit: "Whisper",
    price: 18,
    format: "Digital Guide",
    pages: 12,
    tag: "Copy-paste ready",
    description:
      "Pre-written texts for days when composing a sentence is too much. Send something short and have it be enough.",
  },
  {
    id: "whisper-agreement",
    title: "The Agreement",
    unit: "Whisper",
    price: 15,
    format: "Fillable PDF",
    pages: 2,
    tag: "Protocol",
    description:
      "A one-page protocol decided in a clear-headed moment. For two people who need a shared language for hard days.",
  },
  {
    id: "whisper-wallet-card",
    title: "Whisper Wallet Card",
    unit: "Whisper",
    price: 8,
    format: "Physical Card",
    pages: 0,
    tag: "Portable",
    description:
      "The signal card in permanent form. Bone stock, Willow Green ink. Small enough for a wallet or therapy room table.",
  },
  {
    id: "whisper-guide-reading",
    title: "How to Read a Quiet Person",
    unit: "Whisper",
    price: 22,
    format: "PDF Guide",
    pages: 38,
    tag: "For loved ones",
    description:
      "What quiet behavior can mean, what to do, what to stop doing. The misreadings, taken apart.",
  },
  {
    id: "whisper-guide-cost",
    title: "The Cost of Explaining",
    unit: "Whisper",
    price: 20,
    format: "PDF Guide",
    pages: 32,
    tag: "For the person",
    description:
      "Why describing depression while inside it exhausts you. How to use signals, scripts, and codes to spend less.",
  },
];

export const products = [...willowProducts];

export const willowFeatured: Product[] = [
  {
    id: "nest-reset",
    title: "Nest Reset",
    pillar: "Nest",
    price: 28,
    format: "Space + routine guide",
    pages: 36,
    description:
      "A practical PDF for softening friction at home and rebuilding daily rhythm.",
  },
  {
    id: "wayfinder-notes",
    title: "Wayfinder Notes",
    pillar: "Wayfinder",
    price: 24,
    format: "Transition workbook",
    pages: 44,
    description:
      "A guided resource for seasons that do not move in straight lines.",
  },
  {
    id: "studio-language",
    title: "Studio Language Pack",
    pillar: "Studio",
    price: 36,
    format: "Brand voice toolkit",
    pages: 52,
    description:
      "Messaging prompts, language structures, and tone-setting tools for thoughtful brands.",
  },
];

export const whisperFeatured: Product[] = [
  {
    id: "whisper-code-cards",
    title: "The Code Cards",
    unit: "Whisper",
    price: 45,
    format: "Card Set Bundle",
    pages: 0,
    description:
      "Two decks: signals for the person, readings for those who love them. Bone paper, Willow Green ink, Cormorant Garamond.",
  },
];

export const featured = [...willowFeatured];

export const collectionFilters = [
  "All PDFs",
  "Bundles",
  "Workbooks",
  "Mini Guides",
  "Templates",
] as const;

export const allProducts = [...willowFeatured, ...willowProducts, ...whisperFeatured, ...whisperProducts];
