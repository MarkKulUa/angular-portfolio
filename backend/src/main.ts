import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import type { IncomingMessage, ServerResponse } from 'http';
import type { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';

import { AppModule } from './app.module';

let cachedApp: NestFastifyApplication | null = null;
let cachedFastify: FastifyInstance | null = null;

async function createApp(): Promise<NestFastifyApplication> {
  if (cachedApp) return cachedApp;

  const isProduction = process.env.NODE_ENV === 'production';

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: !isProduction }),
  );

  // Security headers
  await app.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'https:'],
        scriptSrc: [`'self'`],
      },
    },
  });

  // Basic rate limiting (note: serverless instances do not share state)
  await app.register(rateLimit, {
    max: 100,
    timeWindow: '15 minutes',
  });

  // CORS
  const allowedOrigins = [
    process.env.FRONTEND_URL || 'http://localhost:4200',
    'https://portfolio-rmk.vercel.app',
  ].filter(Boolean);

  await app.register(cors, {
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  });

  //allowedHeaders: ['Content-Type', 'Authorization'],

  // app.enableCors({
  //   origin: process.env.FRONTEND_URL || 'http://localhost:4200',
  //   credentials: true,
  // });

  // Swagger disabled in production by default
  const swaggerEnabled = !isProduction && process.env.SWAGGER_DISABLED !== 'true';
  if (swaggerEnabled) {
    const config = new DocumentBuilder()
      .setTitle('API Documentation')
      .setDescription('Angular + NestJS Monorepo API')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
  }

  await app.init();

  // Prepare Fastify once (important for serverless)
  const fastify = app.getHttpAdapter().getInstance() as FastifyInstance;
  await fastify.ready();

  cachedApp = app;
  cachedFastify = fastify;

  return app;
}

async function bootstrap(): Promise<void> {
  const app = await createApp();
  const port = Number(process.env.PORT) || 3000;

  await app.listen(port, '0.0.0.0');

  if (process.env.NODE_ENV !== 'production') {
    console.log(`Application is running on: http://localhost:${port}`);

    console.log(`Swagger docs available at: http://localhost:${port}/api/docs`);
  }
}

// Local dev entrypoint (avoid running inside Vercel)
if (!process.env.VERCEL) {
  bootstrap();
}

// Vercel serverless handler
export default async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
  try {
    await createApp();
    cachedFastify!.server.emit('request', req, res);
  } catch (err) {
    console.error('Serverless handler failed:', err);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
};
