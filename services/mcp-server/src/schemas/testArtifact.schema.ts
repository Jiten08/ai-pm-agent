import { z } from "zod";
import { TestFrameworkZ, TestArtifactStatusZ } from "./enums.schema.js";

export const CreateTestArtifactSchema = z.object({
  taskId: z.string(),
  framework: TestFrameworkZ,
  sourceFilePath: z.string(),
  generatedCode: z.string().min(1),
});

export const ReviewTestArtifactSchema = z.object({
  id: z.string(),
  reviewedById: z.string(),
  status: TestArtifactStatusZ,
});

export const ListTestArtifactsQuerySchema = z.object({
  taskId: z.string(),
});
