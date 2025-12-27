import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  async login(_loginDto: LoginDto): Promise<{ accessToken: string }> {
    // TODO: Implement actual authentication logic
    return {
      accessToken: 'mock-jwt-token',
    };
  }

  async validateUser(email: string, password: string): Promise<boolean> {
    // TODO: Implement actual validation logic
    return email && password ? true : false;
  }
}
