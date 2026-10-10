import "dotenv/config";
import express from "express";
import cors from "cors";
import { McpServer } from "@modelcontextprotocol/server";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp";
import { registerProjectSpecTools } from "./tools/projectSpec.tools.js";
import { registerTaskTools } from "./tools/task.tools.js";
import { registerTestArtifactTools } from "./tools/testArtifact.tools.js";
import { projectSpecRoutes } from "./routes/projectSpec.routes.js";
import { teamMemberRoutes } from "./routes/teamMember.routes.js";
import { taskRoutes } from "./routes/task.routes.js";
import { testArtifactRoutes } from "./routes/testArtifact.routes.js";

function buildServer(): McpServer {
  const server = new McpServer({ name: "ai-pm-mcp", version: "0.2.0" });

  registerProjectSpecTools(server);
  registerTaskTools(server);
  registerTestArtifactTools(server);

  return server;
}

const app = express();
app.use(cors());
app.use(express.json());

app.all("/mcp", async (req, res) => {
  const server = buildServer();
  const transport = new StreamableHTTPServerTransport({
    enableJsonResponse: true,
  });

  res.on("close", () => {
    transport.close();
    server.close();
  });

  await server.connect(transport);
  await transport.handleRequest(req, res, req.body);
});

app.use(
  "/api",
  projectSpecRoutes,
  taskRoutes,
  testArtifactRoutes,
  teamMemberRoutes,
);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

app.listen(PORT, () => {
  console.log(`mcp-server listening on: ${PORT}`);
});
