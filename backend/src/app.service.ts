import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'React 19 + NestJS Monorepo API';
  }
}
