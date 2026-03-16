export type PortfolioRecord = {
  id: string;
  slug: string;
  creatorName: string;
  title: string;
  category: string;
  location: string;
  hourlyRateMin: number;
  hourlyRateMax: number;
  skills: string[];
  proof: string[];
  trustScore: number;
  verified: boolean;
  availability: "OPEN" | "LIMITED" | "UNAVAILABLE";
};

export type JobRecord = {
  id: string;
  slug: string;
  title: string;
  brand: string;
  description: string;
  location: string;
  budgetMin: number;
  budgetMax: number;
  requiredSkills: string[];
  proofSignals: string[];
  requiresVerifiedBadge: boolean;
};

export const portfolioSeed: PortfolioRecord[] = [
  {
    id: "talent-1",
    slug: "aira-social-reels",
    creatorName: "Aira Mehta",
    title: "UGC Video Strategist",
    category: "Creator Marketing",
    location: "India",
    hourlyRateMin: 1800,
    hourlyRateMax: 3500,
    skills: ["ugc", "reels", "scriptwriting", "capcut", "analytics"],
    proof: ["12 brand reel launches", "4.8 average rating", "2.1M aggregate views"],
    trustScore: 0.91,
    verified: true,
    availability: "OPEN",
  },
  {
    id: "talent-2",
    slug: "ravi-nextjs-platforms",
    creatorName: "Ravi Kulkarni",
    title: "Full-Stack Product Engineer",
    category: "Software Engineering",
    location: "India",
    hourlyRateMin: 3000,
    hourlyRateMax: 6000,
    skills: ["next.js", "nestjs", "postgresql", "redis", "docker"],
    proof: ["Shipped 3 SaaS marketplaces", "99.95% uptime on prior platform", "Open-source maintainer"],
    trustScore: 0.95,
    verified: true,
    availability: "LIMITED",
  },
  {
    id: "talent-3",
    slug: "sana-brand-motion",
    creatorName: "Sana Arora",
    title: "Motion Designer",
    category: "Design",
    location: "UAE",
    hourlyRateMin: 2500,
    hourlyRateMax: 4200,
    skills: ["after-effects", "storyboarding", "branding", "reels", "figma"],
    proof: ["Behance feature", "14 campaign explainers", "92% repeat client rate"],
    trustScore: 0.88,
    verified: false,
    availability: "OPEN",
  },
];

export const jobSeed: JobRecord[] = [
  {
    id: "job-1",
    slug: "creator-led-launch-reels",
    title: "Launch 20 creator-led product reels",
    brand: "Northstar D2C",
    description:
      "Need a freelancer who can concept, script, and deliver high-converting launch reels for a skincare brand.",
    location: "India",
    budgetMin: 1500,
    budgetMax: 4000,
    requiredSkills: ["ugc", "reels", "scriptwriting", "analytics"],
    proofSignals: ["brand launches", "short-form performance", "creator portfolio"],
    requiresVerifiedBadge: false,
  },
  {
    id: "job-2",
    slug: "marketplace-platform-mvp",
    title: "Build the first marketplace MVP",
    brand: "Prooflane Labs",
    description:
      "Looking for a full-stack engineer to build Next.js, NestJS, PostgreSQL, and Redis foundations with AI matching hooks.",
    location: "India",
    budgetMin: 2500,
    budgetMax: 6500,
    requiredSkills: ["next.js", "nestjs", "postgresql", "redis", "docker"],
    proofSignals: ["marketplace builds", "B2B SaaS", "infra ownership"],
    requiresVerifiedBadge: true,
  },
];
