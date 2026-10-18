import { z } from "zod";
import { TaskPriorityZ, TaskStatusZ } from "./enums.schema.js";

export const TaskInputSchema = z.object({
  title: z.string().min(3),
  description: z.string(),
  moduleName: z.string().optional(),
  priority: TaskPriorityZ.default("MEDIUM"),
  filePathHint: z.string().optional(),
});

export type TaskInput = z.infer<typeof TaskInputSchema>;

export const BatchCreateTasksSchema = z.object({
  projectSpecId: z.string(),
  tasks: z.array(TaskInputSchema).min(1),
});

export const ClaimTaskSchema = z.object({
  taskId: z.string(),
  teamMemberId: z.string(),
});

export const UpdateTaskStatusSchema = z.object({
  taskId: z.string(),
  status: TaskStatusZ,
});

export const ListTasksSchema = z.object({
  projectSpecId: z.string(),
});
