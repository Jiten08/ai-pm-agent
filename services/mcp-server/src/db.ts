import "dotenv/config.js";
import { createDb, type Db } from "@ai-pm-qa/db";

const url = process.env.DATABASE_URL;

export const db: Db = createDb(url as string);
