import { eq } from "drizzle-orm";
import { db } from "../db/client.js";
import { tasks } from "../db/schema.js";

type TaskInput = {
  title: string;

  description: string;

  moduleName?: string;

  priority?: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

  filePathHint?: string;
};

type TaskStatus =
  | "BACKLOG"
  | "TODO"
  | "IN_PROGRESS"
  | "IN_REVIEW"
  | "DONE"
  | "BLOCKED";

export async function BatchCreateTasks(
  projectSpecId: string,
  taskInputs: TaskInput[],
) {
  await db
    .insert(tasks)
    .values(taskInputs.map((t) => ({ ...t, projectSpecId })));

  return db.select().from(tasks).where(eq(tasks.projectSpecId, projectSpecId));
}

export async function listTasks(projectSpecId: string) {
  return db.select().from(tasks).where(eq(tasks.projectSpecId, projectSpecId));
}

export async function claimTask(taskId: string, teamMemberId: string) {
  const [row] = await db
    .update(tasks)
    .set({ asigneeId: teamMemberId, status: "TODO", updatedAt: new Date() })
    .where(eq(tasks.id, taskId))
    .returning();
  return row;
}

export async function updateTaskStatus(taskId: string, status: TaskStatus) {
  const [row] = await db
    .update(tasks)
    .set({ status, updatedAt: new Date() })
    .where(eq(tasks.id, taskId))
    .returning();
  return row;
}
