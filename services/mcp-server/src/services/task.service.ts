import { eq, tasks, type TaskInput } from "@ai-pm-qa/db";
import { db } from "../db.js";

export async function BatchCreateTasks(
  projectSpecId: string,
  taskInputs: TaskInput[],
) {
  await db
    .insert(tasks)
    .values(taskInputs.map((t) => ({ ...t, projectSpecId })));

  return db.select().from(tasks).where(eq(tasks.projectSpecId, projectSpecId));
}
