import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import { ShopifyService } from './shopify.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly shopifyService: ShopifyService
  ) { }

  @Get('/auth')
  async beginAuth(@Req() req, @Res() res: Response) {
    await this.shopifyService.shopify.auth.begin({
      shop: this.shopifyService.shopify.utils.sanitizeShop('sealion4.myshopify.com', true),
      callbackPath: '/auth/callback',
      isOnline: false,
      rawRequest: req,
      rawResponse: res,
    });
  }

  @Get('/auth/callback')
  async callback(@Req() req, @Res() res: Response) {
    try {
      const callback = await this.shopifyService.shopify.auth.callback({
        rawRequest: req,
        rawResponse: res,
      });
    } catch (error) {
      console.log(error.message);

    }

    res.send('<h1>Callback</h1>')
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
