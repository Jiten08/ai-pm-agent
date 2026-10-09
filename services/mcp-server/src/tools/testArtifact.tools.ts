import { McpServer } from "@modelcontextprotocol/server";
import { CreateTestArtifactSchema } from "../schemas/testArtifact.schema.js";
import * as testArtifactService from "../services/testArtifacts.service.js";

export function registerTestArtifactTools(server: McpServer) {
  server.registerTool(
    "testArtifacts.create",
    {
      title: "Create Test Artifact",
      description: "Store QA-agent-generated test code for a task",
      inputSchema: CreateTestArtifactSchema,
    },

    async ({ taskId, framework, sourceFilePath, generatedCode }) => {
      const row = await testArtifactService.createTestArtifact({
        taskId,
        framework,
        sourceFilePath,
        generatedCode,
      });
      return { content: [{ type: "text", text: JSON.stringify(row) }] };
    },
  );
}
