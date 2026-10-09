ALTER TABLE "test_aartifacts" DROP CONSTRAINT "test_aartifacts_task_id_tasks_id_fk";
--> statement-breakpoint
ALTER TABLE "test_aartifacts" ALTER COLUMN "task_id" SET DATA TYPE uuid USING "task_id"::uuid;
--> statement-breakpoint
ALTER TABLE "test_aartifacts" ADD CONSTRAINT "test_aartifacts_task_id_tasks_id_fk" FOREIGN KEY ("task_id") REFERENCES "public"."tasks"("id") ON DELETE cascade ON UPDATE no action;