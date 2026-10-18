import { eq, projectSpecs } from "@ai-pm-qa/db";
import { db } from "../db.js";

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
