import { McpServer } from "@modelcontextprotocol/server";
import { BatchCreateTasksSchema } from "../schemas/tasks.schema.js";
import * as taskService from "../services/task.service.js";

export function registerTaskTools(server: McpServer) {
  server.registerTool(
    "tasks.batchCreate",

    {
      title: "Batch Create Tasks",
      description:
        "Create multiple tasks under a ProjectSpec from an LLD breakdown",
      inputSchema: BatchCreateTasksSchema,
    },

    async ({ projectSpecId, tasks: taskInputs }) => {
      const rows = await taskService.BatchCreateTasks(
        projectSpecId,
        taskInputs,
      );
      return { content: [{ type: "text", text: JSON.stringify(rows) }] };
    },
  );
}
