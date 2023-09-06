import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config/dist';
import { authCallback, installedOnShop, shopify } from './shopify';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PrismaService } from './prisma.service';
import { billingMiddleware } from './middleware/billingMiddleware';

@Module({
  imports: [
    ServeStaticModule.forRoot({ 
      rootPath: join(__dirname, '..', 'frontend'),
      // exclude: ['/api/(.*)'],
      // serveStaticOptions: { 
      //   index: false
      // }
    }),
    ConfigModule.forRoot({
      envFilePath: '.env'
    })
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(authCallback, billingMiddleware, shopify.redirectToShopifyOrAppRoot()).forRoutes(shopify.config.auth.callbackPath)
    consumer.apply(installedOnShop).forRoutes('/') 
  }
} 
