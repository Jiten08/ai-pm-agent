import { Router } from "express";
import { CreateTeamMemberSchema } from "@ai-pm-qa/db";
import type { z } from "@ai-pm-qa/db";
import { validateBody } from "./validate.js";
import * as teammemberService from "../services/teamMember.service.js";

export const teamMemberRoutes = Router();

function isUniqueViolation(err: unknown): boolean {
  const e = err as { code?: string; cause?: { code?: string } } | null;
  return e?.code === "23505" || e?.cause?.code === "23505";
}

teamMemberRoutes.get("/team-members", async (_req, res) => {
  const rows = await teammemberService.listTeamMembers();
  res.json(rows);
});

teamMemberRoutes.post(
  "/team-member",
  validateBody(CreateTeamMemberSchema),
  async (req, res) => {
    try {
      const row = await teammemberService.ceateTeamMember(
        req.body as z.infer<typeof CreateTeamMemberSchema>,
      );
      res.status(201).json(row);
    } catch (err) {
      if (isUniqueViolation(err)) {
        res
          .status(409)
          .json({ error: "a team member with that email already exists" });
        return;
      }
      throw err; // For errors other than uniqueViolation
    }
  },
);
