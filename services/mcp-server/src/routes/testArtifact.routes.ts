import { Router } from "express";
import type { z } from "zod";
import { validateBody, validateQuery } from "./validate.js";
import {
  ReviewTestArtifactSchema,
  ListTestArtifactsQuerySchema,
} from "../schemas/testArtifact.schema.js";
import * as testArtifactService from "../services/testArtifacts.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

export const testArtifactRoutes = Router();

testArtifactRoutes.get(
  "/test-artifacts",
  validateQuery(ListTestArtifactsQuerySchema),
  async (req, res) => {
    const { taskId } = req.query as unknown as z.infer<
      typeof ListTestArtifactsQuerySchema
    >;
    const rows = await testArtifactService.listTestArtifactsForTask(taskId);
    return res.status(200).json(new ApiResponse(200, rows));
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
      throw new ApiError(404, "not found");
    }

    return res.status(200).json(new ApiResponse(200, row));
  },
);
