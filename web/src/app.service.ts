import { Injectable } from '@nestjs/common';
import '@shopify/shopify-api/adapters/node';
import { shopifyApi, LATEST_API_VERSION, ShopifyRestResources } from '@shopify/shopify-api';
import { ConfigService } from '@nestjs/config';
import { shopify } from './shopify';

@Injectable()
export class AppService {
  shopify: ShopifyRestResources;
  constructor(private configService: ConfigService) {}

  async getHello(): Promise<string> {  
    return `<h1 style="color: navy; text-align: center;">Main Page</h1> Products in store - ${1}` 
  }

  async test(res): Promise<string> {  
    // const count = await shopify.api.rest.Product.count({
    //   session: res.locals.shopify.session
    // })
    return `<h1 style="color: navy; text-align: center;">Main Page</h1> Products in store - ${1}` 
  }
} 
