import type { HeadlineCategory, SortBy } from "./types";

export const NAV_LINKS = [
  { href: "/", label: "Front Page", match: "front-page" },
  { href: "/tech", label: "Tech & Innovation", match: "tech" },
  { href: "/investigative", label: "Investigative & Reads", match: "investigative" },
  { href: "/sources", label: "Source Directory", match: "sources" },
] as const;

export const DESKS: { label: string; href: string; category?: HeadlineCategory; q?: string }[] = [
  { label: "World", href: "/desk/general", category: "general" },
  { label: "Business", href: "/desk/business", category: "business" },
  { label: "Science", href: "/desk/science", category: "science" },
  { label: "Climate", href: "/desk/climate", q: "climate OR environment OR energy" },
  { label: "Politics", href: "/desk/politics", q: "politics OR election OR government" },
];

export const EDITIONS = [
  { id: "us", label: "US National", country: "us" },
  { id: "gb", label: "Europe & UK", country: "gb" },
  { id: "au", label: "Asia-Pacific", country: "au" },
  { id: "global", label: "Global Broad", country: "us" },
] as const;

export const FEATURED_SOURCES = [
  { id: "all", label: "All Sources" },
  { id: "reuters", label: "Reuters" },
  { id: "bloomberg", label: "Bloomberg" },
  { id: "bbc-news", label: "BBC News" },
  { id: "techcrunch", label: "TechCrunch" },
  { id: "cnn", label: "CNN" },
  { id: "associated-press", label: "Associated Press" },
] as const;

export const TECH_TOPICS = [
  { id: "all", label: "All Tech", q: "" },
  { id: "ai", label: "Artificial Intelligence", q: "artificial intelligence OR AI OR machine learning" },
  { id: "hardware", label: "Hardware & Silicon", q: "semiconductor OR chip OR hardware OR silicon" },
  { id: "startups", label: "Startups & Venture", q: "startup OR venture capital OR funding" },
  { id: "cyber", label: "Cybersecurity", q: "cybersecurity OR hacking OR vulnerability" },
  { id: "biotech", label: "Biotech", q: "biotech OR biology OR genome" },
  { id: "space", label: "Space", q: "space OR NASA OR satellite OR orbital" },
] as const;

export const TECH_SOURCES = [
  "techcrunch",
  "the-verge",
  "wired",
  "ars-technica",
  "engadget",
  "the-next-web",
] as const;

export const SORT_OPTIONS: { id: SortBy; label: string; hint: string }[] = [
  { id: "publishedAt", label: "PublishedAt", hint: "Realtime temporal order" },
  { id: "relevancy", label: "Relevancy", hint: "Semantic query density" },
  { id: "popularity", label: "Popularity", hint: "Broadsheet publisher weighting" },
];

export const LANGUAGES = [
  { id: "en", label: "English (en)" },
  { id: "fr", label: "French (fr)" },
  { id: "de", label: "German (de)" },
  { id: "es", label: "Spanish (es)" },
  { id: "ja", label: "Japanese (ja)" },
] as const;

export const SAVED_STREAMS = [
  {
    id: "01",
    name: "Morning Tech Brief",
    query: "AI OR semiconductor OR startup",
    description: "AI models, semiconductor supply chains, venture capital seed fundings across US & EU.",
  },
  {
    id: "02",
    name: "Energy & Geopolitics",
    query: "energy OR nuclear OR OPEC OR lithium",
    description: "Nuclear buildouts, liquefied natural gas shipping lanes, OPEC quotas, and lithium mining pacts.",
  },
  {
    id: "03",
    name: "Global Markets & FX",
    query: "central bank OR bond OR currency OR inflation",
    description: "Central bank rates, sovereign bond yields, currency swap lines, and macroeconomic data prints.",
  },
] as const;
