import { z } from "zod";

export const CreateProjectSpecSchema = z.object({
  title: z.string().min(3),
  rawIdea: z.string().min(10),
});

export const UpdateHldSchema = z.object({
  id: z.string(),
  hldMermaid: z.string(),
});

export const ApproveHldSchema = z.object({
  id: z.string(),
});

export const SaveLldSchema = z.object({
  id: z.string(),
  lldMarkdown: z.string().min(1),
  techStack: z.record(z.string(), z.any()).optional(),
});
