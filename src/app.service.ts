import { Injectable } from '@nestjs/common';
import '@shopify/shopify-api/adapters/node';
import { shopifyApi, LATEST_API_VERSION, ShopifyRestResources } from '@shopify/shopify-api';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  shopify: ShopifyRestResources;
  constructor(private configService: ConfigService) {
    this.shopify = shopifyApi({
      apiKey: this.configService.get('SHOPIFY_API_KEY'),
      apiSecretKey: this.configService.get('SHOPIFY_API_SECRET'),
      hostName: this.configService.get('HOSTNAME'),
      apiVersion: LATEST_API_VERSION,
      scopes: ['read_products'],
      isEmbeddedApp: false,
      hostScheme: 'http'
    });
  }

  getHello(): string {  
    return this.configService.get('SHOPIFY_API_KEY');

  }
}
