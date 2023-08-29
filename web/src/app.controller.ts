import { Body, Controller, Get, Next, Post, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { NextFunction, Request, Response } from 'express';
import { shopify, authBegin, authCallback } from './shopify';
import { PrismaService } from './prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private prisma: PrismaService
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

  @Post('api/customize')
  async test(@Body() data) { 
    // data.number = String(data.number);
    await this.appService.customize(data);
    // console.log(number.number, typeof number.number);
    return "success"
  }
}
