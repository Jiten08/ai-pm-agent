import "dotenv/config";
import { createDb } from "@ai-pm-qa/db";

const url = process.env.DATABASE_URL;

if (!url) {
  throw new Error("DATABASE_URL is not set");
}

export const db = createDb(url!);
