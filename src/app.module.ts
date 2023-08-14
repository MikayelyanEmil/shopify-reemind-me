import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config/dist';
import { ShopifyService } from './shopify.service';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env'
  })],
  controllers: [AppController],
  providers: [AppService, ShopifyService],
})
export class AppModule {}
