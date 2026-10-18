import { Request, Response, NextFunction } from "express";

export function apiNotFound(_req: Request, res: Response) {
  res.status(404).json({ error: "not found" });
}

// Abstracting the errors

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const e = err as { status?: number; type?: string; message?: string };

  if (typeof e?.status === "number" && e.status >= 400 && e.status < 500) {
    res.status(e.status).json({
      error:
        e.type === "entity.parse.failed"
          ? "invalid JSON body"
          : (e.message ?? "bad request"),
    });
    return;
  }

  console.error(`${req.method} ${req.originalUrl} failed:`, err);
  if (res.headersSent) return;
  res.status(500).json({ error: "internal error" });
}
