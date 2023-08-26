import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config/dist';
import { authCallback, installedOnShop, shopify } from './shopify';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({ 
      rootPath: join(__dirname, '..', 'frontend-template'),
      exclude: ['/api/(.*)'],
      // serveStaticOptions: { 
      //   index: false
      // }
    }),
    ConfigModule.forRoot({
      envFilePath: '.env'
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(authCallback).forRoutes(shopify.config.auth.callbackPath)
    consumer.apply(installedOnShop).forRoutes('/*') 
  }
} 
