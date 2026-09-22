import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { teamMembers } from "./schema.js";

export const db = drizzle(process.env.DATABASE_URL!);
