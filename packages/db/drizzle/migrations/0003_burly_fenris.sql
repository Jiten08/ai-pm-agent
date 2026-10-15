CREATE TYPE "public"."test_framework" AS ENUM('PYTEST', 'JEST', 'VITEST');--> statement-breakpoint
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
ALTER TABLE "test_aartifacts" ADD CONSTRAINT "test_aartifacts_task_id_tasks_id_fk" FOREIGN KEY ("task_id") REFERENCES "public"."tasks"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "test_aartifacts" ADD CONSTRAINT "test_aartifacts_reviewed_by_id_team_members_id_fk" FOREIGN KEY ("reviewed_by_id") REFERENCES "public"."team_members"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "test_artifacts_task_idx" ON "test_aartifacts" USING btree ("task_id");