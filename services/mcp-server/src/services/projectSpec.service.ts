import { eq, desc } from "drizzle-orm";
import { db } from "../db/client.js";
import { projectSpecs } from "../db/schema.js";

export async function createProjectSpec(title: string, rawIdea: string) {
  const [row] = await db
    .insert(projectSpecs)
    .values({ title, rawIdea })
    .returning();
  return row;
}

export async function updateHld(id: string, hldMermaid: string) {
  const [row] = await db
    .update(projectSpecs)
    .set({ hldMermaid, status: "AWAITING_HLD_APPROVAL", updatedAt: new Date() })
    .where(eq(projectSpecs.id, id))
    .returning();
  return row;
}

export async function approveHld(id: string) {
  const [row] = await db
    .update(projectSpecs)
    .set({
      status: "HLD_APPROVED",
      hldApprovedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(projectSpecs.id, id))
    .returning();
  return row;
}

export async function saveLld(
  id: string,
  lldMarkdown: string,
  techStack?: Record<string, unknown>,
) {
  const [row] = await db
    .update(projectSpecs)
    .set({
      lldMarkdown,
      techStack,
      status: "LLD_GENERATED",
      updatedAt: new Date(),
    })
    .where(eq(projectSpecs.id, id))
    .returning();
  return row;
}

// REST-only reads

export async function getProjectSpec(id: string) {
  const [row] = await db
    .select()
    .from(projectSpecs)
    .where(eq(projectSpecs.id, id));
  return row;
}

export async function listProjectSpecs() {
  return db.select().from(projectSpecs).orderBy(desc(projectSpecs.createdAt));
}
