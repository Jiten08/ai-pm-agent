import { testArtifacts, type TestFramework } from "@ai-pm-qa/db";
import { db } from "../db.js";

export async function createTestArtifact(input: {
  taskId: string;
  framework: TestFramework;
  sourceFilePath: string;
  generatedCode: string;
}) {
  const [row] = await db.insert(testArtifacts).values(input).returning();
  return row;
}
