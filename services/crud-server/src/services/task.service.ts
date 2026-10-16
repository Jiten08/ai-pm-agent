import { tasks, eq, UpdateTaskStatusSchema } from "@ai-pm-qa/db";
import type { z } from "@ai-pm-qa/db";
import { db } from "../db.js";

type TaskStatus = z.infer<typeof UpdateTaskStatusSchema>["status"];

export async function listtasks(projectSpecId: string) {
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
