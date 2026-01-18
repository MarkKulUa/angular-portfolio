import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export interface JwtPayload {
  sub: string;
  email: string;
  name: string;
}

/**
 * Parse cookies from Cookie header
 */
function parseCookies(cookieHeader?: string): Record<string, string> {
  if (!cookieHeader) return {};

  return cookieHeader.split(';').reduce(
    (cookies, cookie) => {
      const [name, value] = cookie.trim().split('=');
      if (name && value) {
        cookies[name] = decodeURIComponent(value);
      }
      return cookies;
    },
    {} as Record<string, string>,
  );
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        // First try to extract from cookie
        (request: { headers?: { cookie?: string } }): string | null => {
          const cookieHeader = request?.headers?.cookie;
          const cookies = parseCookies(cookieHeader);
          return cookies.auth_token || null;
        },
        // Fallback to Authorization header (for API clients)
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'secret-key-should-be-changed-in-production',
    });
  }

  async validate(payload: JwtPayload): Promise<{ id: string; email: string; name: string }> {
    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
    };
  }
}
