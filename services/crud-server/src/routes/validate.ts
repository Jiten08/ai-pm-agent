import type { Request, Response, NextFunction, RequestHandler } from "express";
import { z, type ZodType } from "@ai-pm-qa/db";

export function validateBody(schema: ZodType): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ error: z.flattenError(result.error) });
      return;
    }
    req.body = result.data;
    next();
  };
}

export function validateQuery(schema: ZodType): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.query);
    if (!result.success) {
      res.status(400).json({ error: z.flattenError(result.error) });
      return;
    }
    res.locals.query = result.data;
    next();
  };
}
