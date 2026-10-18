import { Router } from "express";
import {
  ReviewTestArtifactSchema,
  ListTestArtifactsQuerySchema,
} from "@ai-pm-qa/db";
import type { z } from "@ai-pm-qa/db";
import { validateBody, validateQuery } from "./validate.js";
import * as testArtifactService from "../services/testArtifact.service.js";

export const testArtifactRoutes = Router();

testArtifactRoutes.get(
  "/test-artifacts",
  validateQuery(ListTestArtifactsQuerySchema),
  async (_req, res) => {
    const { taskId } = res.locals.query as z.infer<
      typeof ListTestArtifactsQuerySchema
    >;
    const rows = await testArtifactService.listTestArtiFactsForTasks(taskId);
    res.json(rows);
  },
);

const ReviewBodySchema = ReviewTestArtifactSchema.omit({ id: true });

testArtifactRoutes.patch(
  "/test-artifacts/:id/review",
  validateBody(ReviewBodySchema),
  async (req, res) => {
    const { reviewedById, status } = req.body as z.infer<
      typeof ReviewBodySchema
    >;
    const row = await testArtifactService.reviewTestArtifact(
      req.params.id as string,
      reviewedById,
      status,
    );
    if (!row) {
      res.status(404).json({ error: "not found" });
      return;
    }
    res.json(row);
  },
);
