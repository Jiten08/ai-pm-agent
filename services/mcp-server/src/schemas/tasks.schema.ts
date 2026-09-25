import { z } from "zod";
import { TaskPriorityZ, TaskStatusZ } from "./enums.schema.js";

export const TaskItemSchema = z.object({
  title: z.string().min(3),
  description: z.string(),
  module: z.string().optional(),
  priority: TaskPriorityZ.default("MEDIUM"),
  filePathHint: z.string().optional(),
});

export const BatchCreateTasksSchema = z.object({
  projectSpecId: z.uuid(),
  tasks: z.array(TaskItemSchema),
});

export const ClaimTaskSchema = z.object({
  taskId: z.uuid(),
  teamMemberId: z.uuid(),
});

export const UpdateTaskStatusSchema = z.object({
  taskId: z.uuid(),
  status: TaskStatusZ,
});

export const ListTasksSchema = z.object({
  projectSpecId: z.uuid(),
  status: TaskStatusZ.optional(),
});
