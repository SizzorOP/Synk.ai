import { ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { sign, verify, type JwtPayload, type SignOptions } from "jsonwebtoken";

import { devPersonaSeed } from "../../data/auth.data";
import { DatabaseService } from "../database/database.service";
import type { AuthSession, AuthUser, RoleCode } from "./auth.types";

type DevLoginInput = {
  email: string;
};

type DatabaseUserRow = {
  id: string;
  email: string;
  displayName: string;
  roles: string[];
};

type AccessTokenPayload = JwtPayload & {
  sub: string;
  email: string;
  displayName: string;
  roles: RoleCode[];
  token_use: "access";
};

const DEFAULT_JWT_TTL = "12h";
const DEFAULT_JWT_SECRET = "prooflane-local-dev-secret";

@Injectable()
export class AuthService {
  private readonly jwtSecret =
    process.env.JWT_SECRET?.trim() || DEFAULT_JWT_SECRET;

  private readonly jwtTtl =
    process.env.AUTH_JWT_TTL?.trim() || DEFAULT_JWT_TTL;

  constructor(private readonly databaseService: DatabaseService) {}

  getDevPersonas() {
    return devPersonaSeed;
  }

  async devLogin(input: DevLoginInput): Promise<AuthSession> {
    if (!this.isDevLoginEnabled()) {
      throw new ForbiddenException("Dev login is disabled in this environment.");
    }

    const user = await this.findUserByEmail(input.email);
    if (!user) {
      throw new UnauthorizedException(
        `No localhost persona was found for ${input.email}.`,
      );
    }

    await this.touchLastLogin(user.id);
    return this.issueSession(user);
  }

  async getCurrentUser(token: string): Promise<AuthUser> {
    const payload = this.verifyAccessToken(token);
    const persistedUser = await this.findUserById(payload.sub);
    if (persistedUser) {
      return persistedUser;
    }

    return {
      id: payload.sub,
      email: payload.email,
      displayName: payload.displayName,
      roles: payload.roles,
    };
  }

  private async findUserByEmail(email: string) {
    const normalizedEmail = email.trim().toLowerCase();

    try {
      const rows = await this.databaseService.query<DatabaseUserRow>(
        `
          SELECT
            u.id::text AS id,
            u.email::text AS email,
            u.display_name AS "displayName",
            COALESCE(
              ARRAY_AGG(DISTINCT ur.role::text ORDER BY ur.role::text)
                FILTER (WHERE ur.role IS NOT NULL),
              ARRAY[]::text[]
            ) AS roles
          FROM marketplace.users u
          LEFT JOIN marketplace.user_roles ur ON ur.user_id = u.id
          WHERE LOWER(u.email) = LOWER($1)
            AND u.status = 'ACTIVE'
          GROUP BY u.id
          LIMIT 1
        `,
        [normalizedEmail],
      );

      const databaseUser = this.mapDatabaseUser(rows[0]);
      if (databaseUser) {
        return databaseUser;
      }
    } catch {
      // Fall back to seeded localhost personas.
    }

    return devPersonaSeed.find(
      (persona) => persona.email.toLowerCase() === normalizedEmail,
    );
  }

  private async findUserById(userId: string) {
    try {
      const rows = await this.databaseService.query<DatabaseUserRow>(
        `
          SELECT
            u.id::text AS id,
            u.email::text AS email,
            u.display_name AS "displayName",
            COALESCE(
              ARRAY_AGG(DISTINCT ur.role::text ORDER BY ur.role::text)
                FILTER (WHERE ur.role IS NOT NULL),
              ARRAY[]::text[]
            ) AS roles
          FROM marketplace.users u
          LEFT JOIN marketplace.user_roles ur ON ur.user_id = u.id
          WHERE u.id = $1::uuid
            AND u.status = 'ACTIVE'
          GROUP BY u.id
          LIMIT 1
        `,
        [userId],
      );

      const databaseUser = this.mapDatabaseUser(rows[0]);
      if (databaseUser) {
        return databaseUser;
      }
    } catch {
      // Fall back to seeded localhost personas.
    }

    return devPersonaSeed.find((persona) => persona.id === userId);
  }

  private issueSession(user: AuthUser): AuthSession {
    const signOptions: SignOptions = {
      subject: user.id,
      expiresIn: this.jwtTtl as SignOptions["expiresIn"],
      issuer: "prooflane-api",
      audience: "prooflane-web",
    };

    const accessToken = sign(
      {
        email: user.email,
        displayName: user.displayName,
        roles: user.roles,
        token_use: "access",
      },
      this.jwtSecret,
      signOptions,
    );

    return {
      accessToken,
      tokenType: "Bearer",
      expiresAt: new Date(
        Date.now() + this.durationToMilliseconds(this.jwtTtl),
      ).toISOString(),
      user,
    };
  }

  private verifyAccessToken(token: string) {
    try {
      const payload = verify(token, this.jwtSecret, {
        issuer: "prooflane-api",
        audience: "prooflane-web",
      }) as AccessTokenPayload;

      if (
        payload.token_use !== "access" ||
        typeof payload.sub !== "string" ||
        typeof payload.email !== "string" ||
        typeof payload.displayName !== "string" ||
        !Array.isArray(payload.roles)
      ) {
        throw new UnauthorizedException("Invalid access token.");
      }

      const roles = payload.roles.filter((role): role is RoleCode =>
        this.isRoleCode(role),
      );

      if (roles.length === 0) {
        throw new UnauthorizedException("Access token does not include roles.");
      }

      return {
        ...payload,
        roles,
      };
    } catch {
      throw new UnauthorizedException("Invalid or expired access token.");
    }
  }

  private async touchLastLogin(userId: string) {
    try {
      await this.databaseService.query(
        `
          UPDATE marketplace.users
          SET last_login_at = NOW()
          WHERE id = $1::uuid
        `,
        [userId],
      );
    } catch {
      // Skip when the database is unavailable or the user is seed-only.
    }
  }

  private mapDatabaseUser(row?: DatabaseUserRow) {
    if (!row) {
      return undefined;
    }

    const roles = (row.roles ?? []).filter((role): role is RoleCode =>
      this.isRoleCode(role),
    );

    if (roles.length === 0) {
      return undefined;
    }

    return {
      id: row.id,
      email: row.email,
      displayName: row.displayName,
      roles,
    };
  }

  private durationToMilliseconds(value: string) {
    const match = value.trim().match(/^(\d+)([smhd])$/i);
    if (!match) {
      return 12 * 60 * 60 * 1000;
    }

    const amount = Number(match[1]);
    const unit = match[2].toLowerCase();

    switch (unit) {
      case "s":
        return amount * 1000;
      case "m":
        return amount * 60 * 1000;
      case "h":
        return amount * 60 * 60 * 1000;
      case "d":
        return amount * 24 * 60 * 60 * 1000;
      default:
        return 12 * 60 * 60 * 1000;
    }
  }

  private isDevLoginEnabled() {
    return (process.env.AUTH_DEV_LOGIN_ENABLED ?? "true").toLowerCase() !== "false";
  }

  private isRoleCode(value: string): value is RoleCode {
    return [
      "FREELANCER",
      "BRAND_ADMIN",
      "RECRUITER",
      "FINANCE",
      "SUPPORT",
      "PLATFORM_ADMIN",
    ].includes(value);
  }
}
