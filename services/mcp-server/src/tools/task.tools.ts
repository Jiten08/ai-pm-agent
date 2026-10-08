import { McpServer } from "@modelcontextprotocol/server";
import { desc, eq } from "drizzle-orm";
import { db } from "../db/client.js";
import { tasks, teamMembers } from "../db/schema.js";
import {
  BatchCreateTasksSchema,
  ListTasksSchema,
  ClaimTaskSchema,
  UpdateTaskStatusSchema,
} from "../schemas/tasks.schema.js";

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
      await db
        .insert(tasks)
        .values(taskInputs.map((t) => ({ ...t, projectSpecId })));

      const rows = await db
        .select()
        .from(tasks)
        .where(eq(tasks.projectSpecId, projectSpecId));

      return { content: [{ type: "text", text: JSON.stringify(rows) }] };
    },
  );

  server.registerTool(
    "tasks.list",

    {
      title: "List Tasks",
      description: "List every task under a ProjectSpec, for the Kanban board",
      inputSchema: ListTasksSchema,
    },

    async ({ projectSpecId }) => {
      const rows = await db
        .select()
        .from(tasks)
        .where(eq(tasks.projectSpecId, projectSpecId));

      return { content: [{ type: "text", text: JSON.stringify(rows) }] };
    },
  );

  server.registerTool(
    "task.claim",
    {
      title: "Claim task",
      description: "Assign unclaimed task to a team member",
      inputSchema: ClaimTaskSchema,
    },

    async ({ taskId, teamMemberId }) => {
      const [row] = await db
        .update(tasks)
        .set({ asigneeId: teamMemberId, status: "TODO", updatedAt: new Date() })
        .where(eq(tasks.id, taskId))
        .returning();

      return { content: [{ type: "text", text: JSON.stringify(row) }] };
    },
  );

  server.registerTool(
    "tasks.updateStatus",
    {
      title: "Update Task Status",
      description: "Move a task to a new Kanban column",
      inputSchema: UpdateTaskStatusSchema,
    },

    async ({ taskId, status }) => {
      const [row] = await db
        .update(tasks)
        .set({ status, updatedAt: new Date() })
        .where(eq(tasks.id, taskId))
        .returning();

      return { content: [{ type: "text", text: JSON.stringify(row) }] };
    },
  );
}
