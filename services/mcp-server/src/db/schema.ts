import {
  PgTable,
  integer,
  varchar,
  uuid,
  pgEnum,
  index,
  jsonb,
  timestamp,
  text,
  pgTable,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const projectSpecStatusEnum = pgEnum("project_spec_status", [
  "DRAFT",
  "AWAITING_HLD_APPROVAL",
  "HLD_APPROVED",
  "LLD_GENERATED",
  "IN_PROGRESS",
  "COMPLETED",
]);

export const taskStatusEnum = pgEnum("task_status", [
  "BACKLOG",
  "TODO",
  "IN_PROGRESS",
  "IN_REVIEW",
  "DONE",
  "BLOCKED",
]);

export const taskPriorityEnum = pgEnum("task_priority", [
  "LOW",
  "MEDIUM",
  "HIGH",
  "CRITICAL",
]);

// export const testFrameworksEnum = pgEnum("test_framework", ["PYTEST", "JEST", "VITEST"]);

export const testArtifactStatusEnum = pgEnum("test_artifact_status", [
  "GENERATED",
  "REVIEWED",
  "PASSED",
  "FAILED",
]);

export const teamMembers = pgTable("team_members", {
  id: uuid("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  role: text("role"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const projectSpecs = pgTable("project_specs", {
  id: uuid("id").primaryKey(),
  title: text("title").notNull(),
  rawIdea: text("raw_idea").notNull(),
  clarifiedScope: jsonb("clarified_scope"),
  techStack: jsonb("tech_stack"),
  hldMermaid: text("hld_mermaid"),
  hldApprovedAt: timestamp("hld_approved_at"),
  lldMarkdown: text("lld_markdown"),
  status: projectSpecStatusEnum("status").default("DRAFT").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
