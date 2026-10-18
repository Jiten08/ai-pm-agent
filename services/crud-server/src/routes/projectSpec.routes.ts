import { Router } from "express";
import * as projectSpecService from "../services/projectSpec.service.js";
import { error } from "node:console";

export const projectSpecRoutes = Router();

projectSpecRoutes.get("/project-specs", async (_req, res) => {
  const rows = await projectSpecService.listProjectSpecs();
  res.json(rows);
});

projectSpecRoutes.get("/project-specs/:id", async (req, res) => {
  const row = await projectSpecService.getProjectSpec(req.params.id);
  if (!row) {
    res.status(404).json({ error: "not found" });
    return;
  }
  res.json(row);
});
