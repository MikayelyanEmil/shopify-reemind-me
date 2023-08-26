import 'dotenv/config'
import { shopifyApp } from "@shopify/shopify-app-express";
import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";
import { PrismaClient } from "@prisma/client";

const storage = new PrismaSessionStorage(new PrismaClient());


export const shopify = shopifyApp({
    api: {
        apiKey: process.env.SHOPIFY_API_KEY,
        apiSecretKey: process.env.SHOPIFY_API_SECRET,
        scopes: ['read_products'],
        hostScheme: 'https',
        // hostName: process.env.HOSTNAME,
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