import { Router } from "express";
import {
  ListTasksSchema,
  ClaimTaskSchema,
  UpdateTaskStatusSchema,
} from "@ai-pm-qa/db";
import type { z } from "@ai-pm-qa/db";
import { validateBody, validateQuery } from "./validate.js";
import * as taskService from "../services/task.service.js";
import { reactRefreshWrapperPlugin } from "vite/internal";

export const taskRoutes = Router();

taskRoutes.get("/tasks", validateQuery(ListTasksSchema), async (_req, res) => {
  const { projectSpecId } = res.locals.query as z.infer<typeof ListTasksSchema>;
  const rows = await taskService.listtasks(projectSpecId);
  res.json(rows);
});

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
      res.status(404).json({ error: "not found" });
      return;
    }
    res.json(row);
  },
);

const UpdateStatusBodySchema = UpdateTaskStatusSchema.omit({ taskId: true });

taskRoutes.patch(
  "/tasks/:id/status",
  validateBody(UpdateStatusBodySchema),
  async (req, res) => {
    const { status } = req.body as z.infer<typeof UpdateStatusBodySchema>;
    const row = await taskService.updateTaskStatus(
      req.params.id as string,
      status,
    );
    if (!row) {
      res.status(404).json({ error: "not found" });
      return;
    }
    res.json(row);
  },
);
