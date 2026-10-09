import { db } from "../db/client.js";
import { teamMembers } from "../db/schema.js";

export async function listTeamMembers() {
  return db.select().from(teamMembers);
}

// read-only for data that is directly seeded in database, tool/route to create a team member will be added soon
