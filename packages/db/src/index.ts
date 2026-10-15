// Deep imports are blocked by 'exports

export * from "./schema.js";
export * from "./schemas/projectSpec.schema.js";
export * from "./schemas/task.schema.js";
export * from "./schemas/testArtifact.schema.js";
export * from "./schemas/teamMember.schema.js";
export * from "./schemas/enums.schema.js";

export { createDb, type Db } from "./client.js";

export { eq, and, desc, inArray, sql } from "drizzle-orm";
export { z, type ZodSchema } from "zod";
