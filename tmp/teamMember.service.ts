import { db } from "../db/client.js";
import { teamMembers } from "../db/schema.js";

export async function listTeamMembers() {
  return db.select().from(teamMembers);
}

export async function createTeamMember(input: {
  name: string;
  email: string;
  role?: string;
}) {
  const [row] = await db.insert(teamMembers).values(input).returning();
  return row;
}
