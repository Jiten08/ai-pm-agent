import { z } from "zod";

export const ProjectSpecStatusZ = z.enum([
  "DRAFT",
  "AWAITING_HLD_APPROVAL",
  "HLD_APPROVED",
  "LLD_GENERATED",
  "IN_PROGRESS",
  "COMPLETED",
]);

export const TaskStatusZ = z.enum([
  "BACKLOG",
  "TODO",
  "IN_PROGRESS",
  "IN_REVIEW",
  "DONE",
  "BLOCKED",
]);

export const TaskPriorityZ = z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]);

export const TestFrameworkZ = z.enum(["PYTEST", "JEST", "VITEST"]);

export const TestArtifactStatusZ = z.enum([
  "GENERATED",
  "REVIEWED",
  "PASSED",
  "FAILED",
]);
