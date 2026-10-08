import { z } from "zod";
import { ProjectSpecStatusZ } from "./enums.schema.js";

export const CreateProjectSpecSchema = z.object({
  title: z.string().min(3),
  rawIdea: z.string().min(10),
  clarifiedScope: z.any(),
  techStack: z.array(z.string()).optional(),
});

export const UpdateHldSchema = z.object({
  id: z.string(),
  projectSpecId: z.uuid(),
  hldMermaid: z.string(),
});

export const ApproveHldSchema = z.object({
  projectSpecId: z.uuid(),
});

export const SaveLldSchema = z.object({
  id: z.string(),
  lldMarkdown: z.string().min(1),
  techStack: z.record(z.string(), z.any()).optional(),
});

export const UpdateLldSchema = z.object({
  projectSpecId: z.uuid(),
  lldMarkdown: z.string(),
});

export const UpdateProjectStatusSchema = z.object({
  projectSpecId: z.uuid(),
  status: ProjectSpecStatusZ,
});

export const GetProjectSpecSchema = z.object({
  projectSpecId: z.uuid(),
});
