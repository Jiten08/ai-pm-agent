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
