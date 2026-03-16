export const roleCodes = [
  "FREELANCER",
  "BRAND_ADMIN",
  "RECRUITER",
  "FINANCE",
  "SUPPORT",
  "PLATFORM_ADMIN",
] as const;

export type RoleCode = (typeof roleCodes)[number];

export type AuthUser = {
  id: string;
  email: string;
  displayName: string;
  roles: RoleCode[];
};

export type DevPersona = AuthUser & {
  description: string;
};

export type AuthSession = {
  accessToken: string;
  tokenType: "Bearer";
  expiresAt: string;
  user: AuthUser;
};

export type AuthenticatedRequest = {
  headers: {
    authorization?: string;
  };
  user?: AuthUser;
};
