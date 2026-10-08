import { z } from "zod";

export const CreateTestArtifactSchema = z.object({
  taskId: z.string(),

  framework: z.enum(["PYTEST", "JEST", "VITEST"]),

  sourceFilePath: z.string(),

  generatedCode: z.string().min(1),
});

export const ReviewTestArtifactSchema = z.object({
  id: z.string(),

  reviewedById: z.string(),

  status: z.enum(["GENERATED", "REVIEWED", "PASSED", "FAILED"]),
});
