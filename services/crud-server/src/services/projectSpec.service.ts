import { projectSpecs, eq, desc } from "@ai-pm-qa/db";
import { db } from "../db.js";

export async function listProjectSpecs() {
  return db.select().from(projectSpecs).orderBy(desc(projectSpecs.createdAt));
}

export async function getProjectSpec(id: string) {
  const [row] = await db
    .select()
    .from(projectSpecs)
    .where(eq(projectSpecs.id, id));
  return row;
}
