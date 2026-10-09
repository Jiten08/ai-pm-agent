import { eq } from "drizzle-orm";
import { db } from "../db/client.js";
import { testArtifacts } from "../db/schema.js";

type Framework = "PYTEST" | "JEST" | "VITEST";
type ArtifactStatus = "GENERATED" | "REVIEWED" | "PASSED" | "FAILED";

export async function createTestArtifact(input: {
  taskId: string;
  framework: Framework;
  sourceFilePath: string;
  generatedCode: string;
}) {
  const [row] = await db.insert(testArtifacts).values(input).returning();
  return row;
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

// REST-only reads

export async function listTestArtifactsForTask(taskId: string) {
  return db
    .select()
    .from(testArtifacts)
    .where(eq(testArtifacts.taskId, taskId));
}
