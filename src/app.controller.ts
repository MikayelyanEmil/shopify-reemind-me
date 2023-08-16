import { Controller, Get, Next, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { NextFunction, Request, Response } from 'express';
import { shopify, authBegin, authCallback } from './shopify';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService
  ) { }

  @Get(shopify.config.auth.path)
  auth(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    authBegin(req, res, next);
  }

  @Get(shopify.config.auth.callbackPath)
  callback(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    shopify.redirectToShopifyOrAppRoot()(req, res, next);
  }

  @Get('api')
  getHello(): string {
    return this.appService.getHello();
  }
}
