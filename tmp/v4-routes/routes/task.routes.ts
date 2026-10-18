import { Router } from "express";
import type { z } from "zod";
import { validateBody, validateQuery } from "./validate.js";
import {
  ListTasksSchema,
  ClaimTaskSchema,
  UpdateTaskStatusSchema,
} from "../schemas/tasks.schema.js";
import * as taskService from "../services/task.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

export const taskRoutes = Router();

taskRoutes.get("/tasks", validateQuery(ListTasksSchema), async (req, res) => {
  const { projectSpecId } = req.query as unknown as z.infer<
    typeof ListTasksSchema
  >;
  const rows = await taskService.listTasks(projectSpecId);
  return res.status(200).json(new ApiResponse(200, rows));
});

// taskId is moved from the body to the URL - reusing the ClaimTaskSchema by excluding the taskId
const ClaimBodySchema = ClaimTaskSchema.omit({ taskId: true });

taskRoutes.patch(
  "/tasks/:id/claim",
  validateBody(ClaimBodySchema),
  async (req, res) => {
    const { teamMemberId } = req.body as z.infer<typeof ClaimBodySchema>;
    const row = await taskService.claimTask(
      req.params.id as string,
      teamMemberId,
    );
    if (!row) {
      throw new ApiError(404, "not found");
    }

    return res.status(200).json(new ApiResponse(200, row));
  },
);

const UpdateStatusBodySchema = UpdateTaskStatusSchema.omit({ taskId: true });

taskRoutes.patch(
  "tasks/:id/status",
  validateBody(UpdateStatusBodySchema),
  async (req, res) => {
    const { status } = req.body as z.infer<typeof UpdateStatusBodySchema>;
    const row = await taskService.updateTaskStatus(
      req.params.id as string,
      status,
    );
    if (!row) {
      throw new ApiError(404, "not found");
    }
    return res.status(200).json(new ApiResponse(200, row));
  },
);
