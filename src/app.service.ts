import { Injectable } from '@nestjs/common';
import '@shopify/shopify-api/adapters/node';
import { shopifyApi, LATEST_API_VERSION, ShopifyRestResources } from '@shopify/shopify-api';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  shopify: ShopifyRestResources;
  constructor(private configService: ConfigService) {}

  getHello(): string {  
    return '<h1 style="color: navy; text-align: center;">Main Page<h1>'
  }
}
