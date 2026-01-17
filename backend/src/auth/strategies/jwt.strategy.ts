import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export interface JwtPayload {
  sub: string;
  email: string;
  name: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
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
