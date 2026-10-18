import { Router } from "express";
import * as teamMemberService from "../services/teamMember.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import { validateBody } from "./validate.js";
import { CreateTeamMemberSchema } from "../schemas/teamMember.schema.js";
import ApiError from "../utils/ApiError.js";
export const teamMemberRoutes = Router();

teamMemberRoutes.get("/team-members", async (_req, res) => {
  const rows = await teamMemberService.listTeamMembers();
  return res.status(200).json(new ApiResponse(200, rows));
});

teamMemberRoutes.post(
  "/team-members",
  validateBody(CreateTeamMemberSchema),
  async (req, res) => {
    try {
      const row = await teamMemberService.createTeamMember(req.body);
      return res.status(201).json(new ApiResponse(201, row));
    } catch (err: any) {
      // ERROR: duplicate key value violation in postgres
      if (err?.code === "23505") {
        throw new ApiError(409, "a team member with that email already exists");
      }
      throw err;
    }
  },
);
