import type { Request, Response, NextFunction } from "express";
import type { ZodType } from "zod";
import { z } from "zod";

export function validateBody(schema: ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({ error: z.flattenError(result.error) });
    }

    req.body = result.data;
    next();
  };
}

export function validateQuery(schema: ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.query);

    if (!result.success) {
      return res.status(400).json({ error: z.flattenError(result.error) });
    }

    req.query = result.data as any;
    next();
  };
}
