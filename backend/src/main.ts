import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
  app.enableCors({
    origin: [
      'http://localhost:9002',
      'http://127.0.0.1:9002',
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      'http://localhost:9003',
      'http://127.0.0.1:9003',
      'https://ecoconnect-ten.vercel.app'
    ],
    credentials: false,
  });

  // Enable Prisma shutdown hooks
  const prisma = app.get(PrismaService);
  await prisma.enableShutdownHooks(app);
  const port = process.env.PORT ? Number(process.env.PORT) : 3000;
  const host = process.env.HOST || '0.0.0.0';
  await app.listen(port, host);
  console.log(`NestJS API is running on http://${host}:${port}`);
}
bootstrap();