import 'dotenv/config'
import { shopifyApp } from "@shopify/shopify-app-express";
import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";
import { PrismaClient } from "@prisma/client";
import { BillingInterval, BillingReplacementBehavior } from '@shopify/shopify-api';

const storage = new PrismaSessionStorage(new PrismaClient());

// const billingConfig = {
//     'My billing plan': {
//         interval: BillingInterval.OneTime,
//         amount: 30,
//         currencyCode: 'USD',
//         replacementBehavior: BillingReplacementBehavior.ApplyImmediately,
//         discount: {
//             durationLimitInIntervals: 3,
//             value: {
//                 amount: 10
//             }
//         }
//     }
// }

export const shopify = shopifyApp({
    api: {
        apiKey: process.env.SHOPIFY_API_KEY,
        apiSecretKey: process.env.SHOPIFY_API_SECRET,
        scopes: ['read_products'],
        hostScheme: 'https',
        billing: {
            "Plan A": {
                interval: BillingInterval.Every30Days,
                amount: 45,
                currencyCode: "USD",
                replacementBehavior: BillingReplacementBehavior.ApplyImmediately,
            }
        }
    },
    auth: {
        path: '/api/auth',
        callbackPath: '/api/auth/callback',
    },
    webhooks: {
        path: '/api/webhooks',
    },
    sessionStorage: storage,
});

export const authBegin = shopify.auth.begin();
export const authCallback = shopify.auth.callback();
export const installedOnShop = shopify.ensureInstalledOnShop();
// export const webhooks = shopify.processWebhooks({webhookHandlers: null})