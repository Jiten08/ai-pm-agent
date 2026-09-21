CREATE TYPE "public"."project_spec_status" AS ENUM('DRAFT', 'AWAITING_HLD_APPROVAL', 'HLD_APPROVED', 'LLD_GENERATED', 'IN_PROGRESS', 'COMPLETED');--> statement-breakpoint
CREATE TYPE "public"."task_priority" AS ENUM('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');--> statement-breakpoint
CREATE TYPE "public"."task_status" AS ENUM('BACKLOG', 'TODO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE', 'BLOCKED');--> statement-breakpoint
CREATE TYPE "public"."test_artifact_status" AS ENUM('GENERATED', 'REVIEWED', 'PASSED', 'FAILED');--> statement-breakpoint
CREATE TABLE "team_members" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"role" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "team_members_email_unique" UNIQUE("email")
);
