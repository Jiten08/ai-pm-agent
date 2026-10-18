import "dotenv/config";
import { createDb, type Db } from "@ai-pm-qa/db";

const url = process.env.DATABASE_URL;

if (!url) {
  throw new Error("DATABASE_URL is not set");
}

export const db: Db = createDb(url);
