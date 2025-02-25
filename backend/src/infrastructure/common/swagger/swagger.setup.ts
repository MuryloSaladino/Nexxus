import { NestFastifyApplication } from "@nestjs/platform-fastify";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ResponseFormat } from "../interceptors/response.interceptor";

export function setupSwagger(app: NestFastifyApplication) {
    const config = new DocumentBuilder()
        .addBearerAuth()
        .setTitle('Clean Architecture Nestjs')
        .setDescription('Example with todo list')
        .setVersion('1')
        .build();
    const document = SwaggerModule.createDocument(app, config, {
        extraModels: [ResponseFormat],
        deepScanRoutes: true,
    });
    SwaggerModule.setup('/api/docs', app, document);
}