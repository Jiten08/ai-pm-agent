import "dotenv/config";
import express from "express";
import { requestLog } from "./middleware/requestLog.js";
import { apiNotFound, errorHandler } from "./middleware/errors.js";
import { projectSpecRoutes } from "./routes/projectSpec.routes.js";
import { taskRoutes } from "./routes/task.routes.js";
import { testArtifactRoutes } from "./routes/testArtifact.routes.js";
import { teamMemberRoutes } from "./routes/teamMember.routes.js";
import test from "node:test";

const app = express();

app.use(requestLog);
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use(
  "/api",
  projectSpecRoutes,
  taskRoutes,
  teamMemberRoutes,
  testArtifactRoutes,
);
app.use("/api", apiNotFound);

app.use(errorHandler);

const PORT = process.env.PORT ? Number(process.env.PORT) : 4001;
app.listen(PORT, () => {
  console.log(`crud-server listening on: ${PORT}`);
});
