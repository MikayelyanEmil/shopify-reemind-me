import { Injectable } from '@nestjs/common';
import '@shopify/shopify-api/adapters/node';
import { shopifyApi, LATEST_API_VERSION, ShopifyRestResources } from '@shopify/shopify-api';
import { ConfigService } from '@nestjs/config';
import { shopify } from './shopify';
import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AppService {
  shopify: ShopifyRestResources;
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService
  ) {}

  async getHello(): Promise<string> {  
    return `<h1 style="color: navy; text-align: center;">Main Page</h1> Products in store - ${1}` 
  }

  async customize(data: Prisma.CustomizationSettingsCreateInput) {
    return this.prisma.customizationSettings.create({
      data
    })
  }
} 
