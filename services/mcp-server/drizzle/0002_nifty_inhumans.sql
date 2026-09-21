CREATE TABLE "tasks" (
	"id" uuid PRIMARY KEY NOT NULL,
	"project_spec_id" text NOT NULL,
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
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_project_spec_id_project_specs_id_fk" FOREIGN KEY ("project_spec_id") REFERENCES "public"."project_specs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_asignee_id_team_members_id_fk" FOREIGN KEY ("asignee_id") REFERENCES "public"."team_members"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "task_project_status_idx" ON "tasks" USING btree ("project_spec_id","status");