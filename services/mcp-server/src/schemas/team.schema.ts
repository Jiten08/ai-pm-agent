import { z } from "zod";

export const CreateTeamMemberSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  role: z.string().optional(),
});

export const GetTeamMemberSchema = z.object({
  id: z.uuid(),
});
