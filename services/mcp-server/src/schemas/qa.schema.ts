import { z } from "zod";
import { TestArtifactStatusZ, TestFrameworkZ } from "./enums.schema.js";

export const CreateTestArtifactSchema = z.object({
  taskId: z.uuid(),
  framework: TestFrameworkZ,
  sourceFilePath: z.string(),
  generatedCode: z.string(),
});

export const UpdateTestArtifactStatusSchema = z.object({
  artifactId: z.uuid(),
  status: TestArtifactStatusZ,
  reviewedById: z.uuid().optional(),
});

export const GetArtifactsByTaskSchema = z.object({
  taskId: z.uuid(),
});
