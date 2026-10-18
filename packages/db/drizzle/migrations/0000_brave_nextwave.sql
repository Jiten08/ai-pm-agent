CREATE TYPE "public"."project_spec_status" AS ENUM('DRAFT', 'AWAITING_HLD_APPROVAL', 'HLD_APPROVED', 'LLD_GENERATED', 'IN_PROGRESS', 'COMPLETED');--> statement-breakpoint
CREATE TYPE "public"."task_priority" AS ENUM('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');--> statement-breakpoint
CREATE TYPE "public"."task_status" AS ENUM('BACKLOG', 'TODO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE', 'BLOCKED');--> statement-breakpoint
CREATE TYPE "public"."test_artifact_status" AS ENUM('GENERATED', 'REVIEWED', 'PASSED', 'FAILED');--> statement-breakpoint
CREATE TYPE "public"."test_framework" AS ENUM('PYTEST', 'JEST', 'VITEST');--> statement-breakpoint
CREATE TABLE "project_specs" (
	"id" uuid PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"raw_idea" text NOT NULL,
	"clarified_scope" jsonb,
	"tech_stack" jsonb,
	"hld_mermaid" text,
	"hld_approved_at" timestamp,
	"lld_markdown" text,
	"status" "project_spec_status" DEFAULT 'DRAFT' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tasks" (
	"id" uuid PRIMARY KEY NOT NULL,
	"project_spec_id" uuid NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"module_name" text,
	"status" "task_status" DEFAULT 'BACKLOG' NOT NULL,
	"priority" "task_priority" DEFAULT 'MEDIUM' NOT NULL,
	"asignee_id" uuid,
	"file_path_hint" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "team_members" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"role" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "team_members_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "test_aartifacts" (
	"id" uuid PRIMARY KEY NOT NULL,
	"task_id" uuid NOT NULL,
	"framework" "test_framework" NOT NULL,
	"source_file_path" text NOT NULL,
	"generated_code" text NOT NULL,
	"status" "test_artifact_status" DEFAULT 'GENERATED' NOT NULL,
	"reviewed_by_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_project_spec_id_project_specs_id_fk" FOREIGN KEY ("project_spec_id") REFERENCES "public"."project_specs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_asignee_id_team_members_id_fk" FOREIGN KEY ("asignee_id") REFERENCES "public"."team_members"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "test_aartifacts" ADD CONSTRAINT "test_aartifacts_task_id_tasks_id_fk" FOREIGN KEY ("task_id") REFERENCES "public"."tasks"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "test_aartifacts" ADD CONSTRAINT "test_aartifacts_reviewed_by_id_team_members_id_fk" FOREIGN KEY ("reviewed_by_id") REFERENCES "public"."team_members"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "task_project_status_idx" ON "tasks" USING btree ("project_spec_id","status");--> statement-breakpoint
CREATE INDEX "test_artifacts_task_idx" ON "test_aartifacts" USING btree ("task_id");