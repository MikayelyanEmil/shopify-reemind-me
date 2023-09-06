import { NextFunction, Request, Response } from "express";
import { shopify } from "../shopify";

export async function billingMiddleware(req: Request, res: Response, next: NextFunction) {
    console.log(res.locals.shopify.session);
    // next();
    const hasPayment = await shopify.api.billing.check({
        session: res.locals.shopify.session,
        plans: ['Plan A'],
        isTest: true,
    });

    if (hasPayment) {
        console.log('Has Payment');
        next();
    } else {
        const confirmationUrl = await shopify.api.billing.request({
            session: res.locals.shopify.session,
            plan: 'Plan A',
            isTest: true,
        });

        res.redirect(confirmationUrl);
    }
}