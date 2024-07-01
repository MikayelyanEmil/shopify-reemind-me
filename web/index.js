// @ts-check
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";
import { PrismaClient } from "@prisma/client";
import reminderService from "./service/reminderService.js";

import shopify from "./shopify.js";
import productCreator from "./product-creator.js";
import GDPRWebhookHandlers from "./gdpr.js";

import '@shopify/shopify-api/adapters/node';
import { Session } from "@shopify/shopify-api";

const prisma = new PrismaClient();

const PORT = parseInt(
  process.env.BACKEND_PORT || process.env.PORT || "3000",
  10
);

const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;

const app = express();

// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot()
);
app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: GDPRWebhookHandlers })
);

// If you are adding routes outside of the /api path, remember to
// also add a proxy rule for them in web/frontend/vite.config.js
app.use(express.json());

app.post("/api/subscribe", async (req, res) => {
  const { email, date, productId, shop } = req.body;
  const sessionParams = await prisma.session.findUnique({ where: { id: 'offline_' + shop } })
  const session = new Session(sessionParams);
  const productData = await shopify.api.rest.Product.find({ session, id: productId, fields: ["handle"] });
  const handle = productData?.handle;

  reminderService.setReminder({ email, date, shop, handle });
  res.status(200).send({ success: true });
});

app.get("/api/customization-settings", async (req, res) => {
  console.log(12);
  try {
    const settings = await prisma.customizationSettings.findFirstOrThrow({ where: { id: req.body.shop }})
    res.json(settings);
  } catch (error) {
    console.log(error.message);
  }
});

app.use("/api/*", (_, __, next) => { console.log("Validation"); next(); }, shopify.validateAuthenticatedSession());


app.get("/api/products/count", async (_req, res) => {
  const countData = await shopify.api.rest.Product.count({
    session: res.locals.shopify.session,
  });
  res.status(200).send(countData);
});

app.get("/api/products/create", async (_req, res) => {
  let status = 200;
  let error = null;
  console.log(res.locals.shopify.session);
  try {
    await productCreator(res.locals.shopify.session);
  } catch (e) {
    console.log(`Failed to process products/create: ${e.message}`);
    status = 500;
    error = e.message;
  }
  res.status(status).send({ success: status === 200, error });
});

app.post("/api/customize", async (req, res) => {
  let { formColor, buttonColor, buttonBorderRadius} = req.body;
  formColor = `hsl(${formColor.hue}, ${formColor.saturation * 100}%, ${formColor.brightness * 100}%)`;
  buttonColor = `hsl(${buttonColor.hue}, ${buttonColor.saturation * 100}%, ${buttonColor.brightness * 100}%)`;
  buttonBorderRadius += 'px';
  const setting = await prisma.customizationSettings.upsert({
    where: {
      id: res.locals.shopify.session.shop,
    },
    update: {
      formColor, 
      buttonColor,
      buttonBorderRadius 
    },
    create: {
      id: res.locals.shopify.session.shop,
      formColor, 
      buttonColor,
      buttonBorderRadius 
    }
  });
  res.status(200).send(setting);
});

app.use(shopify.cspHeaders());
app.use(serveStatic(STATIC_PATH, { index: false }));

app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html")));
});

app.listen(PORT);
