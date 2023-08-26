import { Controller, Get, Next, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { NextFunction, Request, Response } from 'express';
import { shopify, authBegin, authCallback } from './shopify';
import { readFileSync } from 'fs';
import { join } from 'path';

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

  // @Get('')
  // Home(@Res() res: Response) {
  //   return res
  //   .status(200)
  //   .set("Content-Type", "text/html")
  //   .send(readFileSync(join(__dirname, '..', 'frontend/dist', "index.html")));
  // }

  @Get('test')
  async test(@Res() res: Response) {
    const answer = await this.appService.test(res);
    res.send(answer);
  }
}
