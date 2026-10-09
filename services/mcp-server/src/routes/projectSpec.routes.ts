import { Router } from "express";
import * as projectSpecService from "../services/projectSpec.service.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

export const projectSpecRoutes = Router();

projectSpecRoutes.get("/project-specs", async (_req, res) => {
  const rows = await projectSpecService.listProjectSpecs();
  new ApiResponse(200, rows, "Fetched project specs successfully.");
});

projectSpecRoutes.get("/project-specs/:id", async (req, res) => {
  const row = await projectSpecService.getProjectSpec(req.params.id);
  if (!row) throw new ApiError(404, "Not found");
  new ApiResponse(200, row, "Data fetched successfully.");
});
