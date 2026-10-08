import { McpServer } from "@modelcontextprotocol/server";
import { eq } from "drizzle-orm";
import { db } from "../db/client.js";
import { taskPriorityEnum, testArtifacts } from "../db/schema.js";
import {
  CreateTestArtifactSchema,
  ReviewTestArtifactSchema,
} from "../schemas/testArtifact.schema.js";

export function registerTestArtifactTools(server: McpServer) {
  server.registerTool(
    "testArtifacts.create",
    {
      title: "Create Test Artifact",
      description: "Store QA-agent-generated test code for a task",
      inputSchema: CreateTestArtifactSchema,
    },

    async ({ taskId, framework, sourceFilePath, generatedCode }) => {
      const [row] = await db
        .insert(testArtifacts)
        .values({ taskId, framework, sourceFilePath, generatedCode })
        .returning();

      return { content: [{ type: "text", text: JSON.stringify(row) }] };
    },
  );

  server.registerTool(
    "testArtifacts.review",

    {
      title: "Review Test Artifact",
      description: "Record a team member's review verdict on a generated test",
      inputSchema: ReviewTestArtifactSchema,
    },

    async ({ id, reviewedById, status }) => {
      const [row] = await db
        .update(testArtifacts)
        .set({ reviewedById, status })
        .where(eq(testArtifacts.id, id))
        .returning();

      return { content: [{ type: "text", text: JSON.stringify(row) }] };
    },
  );
}
