import { NextFunction, Request, Response } from "express";
import { authCallback } from "src/shopify";

export function callback(req: Request, res: Response, next: NextFunction) {
    authCallback(req, res, next);
}