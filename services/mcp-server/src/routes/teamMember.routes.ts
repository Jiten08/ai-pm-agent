import { Router } from "express";
import * as teamMemberService from "../services/teamMember.service.js";
import ApiResponse from "../utils/ApiResponse.js";

export const teamMemberRoutes = Router();

teamMemberRoutes.get("/team-members", async (_req, res) => {
  const rows = await teamMemberService.listTeamMembers();
  return res.status(200).json(new ApiResponse(200, rows));
});
