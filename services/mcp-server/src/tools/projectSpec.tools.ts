import { McpServer } from "@modelcontextprotocol/server";
import { db } from "../db/client.js";
import { eq } from "drizzle-orm";
import { projectSpecs } from "../db/schema.js";

import {
  CreateProjectSpecSchema,
  UpdateHldSchema,
  ApproveHldSchema,
  SaveLldSchema,
} from "../schemas/project.schema.js";

export function registerProjectSpecTools(server: McpServer) {
  server.registerTool(
    "projectSpec.create",
    {
      title: "Create Project Spec",
      description:
        "Create a new ProjectSpec from a raw idea, at the start of an intake session",
      inputSchema: CreateProjectSpecSchema,
    },

    async ({ title, rawIdea }) => {
      const [row] = await db
        .insert(projectSpecs)
        .values({ title, rawIdea })
        .returning();

      return { content: [{ type: "text", text: JSON.stringify(row) }] };
    },
  );

  server.registerTool(
    "projectSpec.updateHld",
    {
      title: "Update HLD",
      description:
        "Store the generated mermaid HLD on a ProjectSpec and mark it awaiting approval",
      inputSchema: UpdateHldSchema,
    },

    async ({ id, hldMermaid }) => {
      const [row] = await db
        .update(projectSpecs)
        .set({
          hldMermaid,
          status: "AWAITING_HLD_APPROVAL",
          updatedAt: new Date(),
        })
        .where(eq(projectSpecs.id, id))
        .returning();

      return { content: [{ type: "text", text: JSON.stringify(row) }] };
    },
  );

  server.registerTool(
    "projectSpec.approveHld",

    {
      title: "Approve HLD",
      description: "Mark a ProjectSpec's HLD as approved after human sign-off",
      inputSchema: ApproveHldSchema,
    },

    async ({ id }) => {
      const [row] = await db
        .update(projectSpecs)
        .set({
          status: "HLD_APPROVED",
          hldApprovedAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(projectSpecs.id, id))
        .returning();

      return { content: [{ type: "text", text: JSON.stringify(row) }] };
    },
  );

  server.registerTool(
    "projectSpec.saveLld",

    {
      title: "Save LLD",
      description:
        "Persist the generated LLD markdown and tech stack once approved",
      inputSchema: SaveLldSchema,
    },

    async ({ id, lldMarkdown, techStack }) => {
      const [row] = await db
        .update(projectSpecs)
        .set({
          lldMarkdown,
          techStack,
          status: "LLD_GENERATED",
          updatedAt: new Date(),
        })
        .where(eq(projectSpecs.id, id))
        .returning();

      return { content: [{ type: "text", text: JSON.stringify(row) }] };
    },
  );
}
