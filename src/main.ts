import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { ValidationPipe } from "./pipes/validation.pipe";


async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle('DEMO of widget_v01')
    .setDescription('REST API DOCUMENTATION')
    .setVersion('1.0.0')
    .addTag('forNodaNorm')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/docs', app, document)
  //app.useGlobalGuards(JwtAuthGuard)// для ограничения использования приложения неавторизированным пользователям
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`))
}

start()