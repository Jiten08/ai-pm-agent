import { testArtifacts, eq, ReviewTestArtifactSchema } from "@ai-pm-qa/db";
import type { z } from "@ai-pm-qa/db";
import { db } from "../db.js";

type ArtifactStatus = z.infer<typeof ReviewTestArtifactSchema>["status"];

export async function listTestArtiFactsForTasks(taskId: string) {
  return db
    .select()
    .from(testArtifacts)
    .where(eq(testArtifacts.taskId, taskId));
}

export async function reviewTestArtifact(
  id: string,
  reviewedById: string,
  status: ArtifactStatus,
) {
  const [row] = await db
    .update(testArtifacts)
    .set({ reviewedById, status })
    .where(eq(testArtifacts.id, id))
    .returning();

  return row;
}
