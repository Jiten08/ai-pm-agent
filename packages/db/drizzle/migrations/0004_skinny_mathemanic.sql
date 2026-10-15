ALTER TABLE "tasks" DROP CONSTRAINT "tasks_project_spec_id_project_specs_id_fk";
--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "project_spec_id" SET DATA TYPE uuid USING "project_spec_id"::uuid;
--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_project_spec_id_project_specs_id_fk" FOREIGN KEY ("project_spec_id") REFERENCES "public"."project_specs"("id") ON DELETE cascade ON UPDATE no action;