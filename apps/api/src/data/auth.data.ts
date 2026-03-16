import type { DevPersona } from "../modules/auth/auth.types";

export const devPersonaSeed: DevPersona[] = [
  {
    id: "11111111-1111-1111-1111-111111111111",
    email: "aira@example.com",
    displayName: "Aira Mehta",
    roles: ["FREELANCER"],
    description: "Freelancer persona for portfolio creation and talent-side flows.",
  },
  {
    id: "22222222-2222-2222-2222-222222222222",
    email: "ravi@example.com",
    displayName: "Ravi Kulkarni",
    roles: ["FREELANCER"],
    description: "Freelancer persona aligned with the engineering marketplace seed.",
  },
  {
    id: "33333333-3333-3333-3333-333333333333",
    email: "sana@example.com",
    displayName: "Sana Arora",
    roles: ["FREELANCER"],
    description: "Freelancer persona for creative portfolio workflows.",
  },
  {
    id: "44444444-4444-4444-4444-444444444444",
    email: "ops@prooflane.dev",
    displayName: "Prooflane Recruiter",
    roles: ["RECRUITER"],
    description: "Recruiter persona for job creation and talent discovery.",
  },
  {
    id: "55555555-5555-5555-5555-555555555555",
    email: "admin@prooflane.dev",
    displayName: "Prooflane Admin",
    roles: ["PLATFORM_ADMIN"],
    description: "Platform admin persona for cross-role testing and vector sync controls.",
  },
];
