import {
  uuid,
  pgEnum,
  index,
  jsonb,
  timestamp,
  text,
  pgTable,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { randomUUID } from "node:crypto";

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

export const testFrameworksEnum = pgEnum("test_framework", [
  "PYTEST",
  "JEST",
  "VITEST",
]);

export const testArtifactStatusEnum = pgEnum("test_artifact_status", [
  "GENERATED",
  "REVIEWED",
  "PASSED",
  "FAILED",
]);

export const teamMembers = pgTable("team_members", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  role: text("role"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const projectSpecs = pgTable("project_specs", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => randomUUID()),
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

export const tasks = pgTable(
  "tasks",
  {
    id: uuid("id")
      .primaryKey()
      .$defaultFn(() => randomUUID()),
    projectSpecId: uuid("project_spec_id")
      .notNull()
      .references(() => projectSpecs.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    description: text("description").notNull(),
    moduleName: text("module_name"),
    status: taskStatusEnum("status").default("BACKLOG").notNull(),
    priority: taskPriorityEnum("priority").default("MEDIUM").notNull(),
    asigneeId: uuid("asignee_id").references(() => teamMembers.id),
    filePathHint: text("file_path_hint"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    index("task_project_status_idx").on(table.projectSpecId, table.status),
  ],
);

export const testArtifacts = pgTable(
  "test_aartifacts",
  {
    id: uuid("id")
      .primaryKey()
      .$defaultFn(() => randomUUID()),
    taskId: uuid("task_id")
      .notNull()
      .references(() => tasks.id, { onDelete: "cascade" }),
    framework: testFrameworksEnum("framework").notNull(),
    sourceFilePath: text("source_file_path").notNull(),
    generatedCode: text("generated_code").notNull(),
    status: testArtifactStatusEnum("status").default("GENERATED").notNull(),
    reviewedById: uuid("reviewed_by_id").references(() => teamMembers.id),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [index("test_artifacts_task_idx").on(table.taskId)],
);

export const projectSpecRelations = relations(projectSpecs, ({ many }) => ({
  tasks: many(tasks),
}));

export const tasksRelations = relations(tasks, ({ one, many }) => ({
  projectSpec: one(projectSpecs, {
    fields: [tasks.projectSpecId],
    references: [projectSpecs.id],
  }),
  assignee: one(teamMembers, {
    fields: [tasks.asigneeId],
    references: [teamMembers.id],
  }),
  testArtifacts: many(testArtifacts),
}));

export const testArtifactsRelations = relations(testArtifacts, ({ one }) => ({
  task: one(tasks, { fields: [testArtifacts.taskId], references: [tasks.id] }),
  reviewedBy: one(teamMembers, {
    fields: [testArtifacts.reviewedById],
    references: [teamMembers.id],
  }),
}));
