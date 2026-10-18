import type { Request, Response, NextFunction } from "express";

export function requestLog(req: Request, res: Response, next: NextFunction) {
  if (req.path === "/health") {
    next();
    return;
  }

  const start = process.hrtime.bigint();
  res.on("finish", () => {
    const ms = Number(process.hrtime.bigint() - start) / 1e6;
    console.log(
      `${req.method} ${req.originalUrl} ${res.statusCode} ${ms.toFixed(1)}ms`,
    );
  });
  next();
}
