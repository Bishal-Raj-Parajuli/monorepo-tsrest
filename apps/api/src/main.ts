import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { generateOpenApi } from '@ts-rest/open-api';
import { APIContract } from '@mono-repo/ts-rest';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // TS-Rest Swagger configuration
  const openApiDocument = generateOpenApi(APIContract, {
    info: {
      title: 'Test API',
      version: '1.0.0',
    },
  });
  SwaggerModule.setup('api', app, openApiDocument);

  app.enableCors();
  await app.listen(3000);
}
bootstrap();
