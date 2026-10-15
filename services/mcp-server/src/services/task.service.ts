import { eq, tasks, type TaskPriority } from "@ai-pm-qa/db";
import { db } from "../db.js";

type TaskInput = {
  title: string;
  description: string;
  moduleName?: string;
  priority?: TaskPriority;
  filePathHint?: string;
};

export async function BatchCreateTasks(
  projectSpecId: string,
  taskInputs: TaskInput[],
) {
  await db
    .insert(tasks)
    .values(taskInputs.map((t) => ({ ...t, projectSpecId })));

  return db.select().from(tasks).where(eq(tasks.projectSpecId, projectSpecId));
}
