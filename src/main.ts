import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

declare const module: any;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const port = process.env.PORT || 3000;

    const config = new DocumentBuilder()
        .setTitle('Slack API')
        .setDescription('Slack 개발 API 문서')
        .setVersion('1.0')
        .addCookieAuth('connect.sid')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(port);
    console.log(`${port}번 실행중...`);

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}
bootstrap();
