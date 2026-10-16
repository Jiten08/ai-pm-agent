import { teamMembers, CreateTeamMemberSchema } from "@ai-pm-qa/db";
import type { z } from "@ai-pm-qa/db";
import { db } from "../db.js";

type NewTeamMember = z.infer<typeof CreateTeamMemberSchema>;

export async function listTeamMembers() {
  return db.select().from(teamMembers);
}

export async function ceateTeamMember(input: NewTeamMember) {
  const [row] = await db.insert(teamMembers).values(input).returning();

  return row;
}
