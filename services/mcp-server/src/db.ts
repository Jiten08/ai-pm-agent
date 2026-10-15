import "dotenv/config.js";
import { createDb } from "@ai-pm-qa/db";

const url = process.env.DATABASE_URL;

export const db = createDb(url);
