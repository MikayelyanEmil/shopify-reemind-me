import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import 'dotenv/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService); 
  console.log(process.env.BACKEND_PORT + ' 222222222222222222222222222222222222222222222222222222222222');
   
  await app.listen(process.env.BACKEND_PORT);     
}
bootstrap(); 
