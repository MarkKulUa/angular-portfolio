import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Angular 21 + NestJS Monorepo API';
  }
}
