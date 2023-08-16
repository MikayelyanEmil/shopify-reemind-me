import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config/dist';
import { authCallback, shopify } from './shopify';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env'
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(authCallback).forRoutes(shopify.config.auth.callbackPath)
  }
}
