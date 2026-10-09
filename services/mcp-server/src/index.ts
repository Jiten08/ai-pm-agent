import "dotenv/config";
import { McpServer } from "@modelcontextprotocol/server";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp";
import express from "express";
import cors from "cors";
import { registerProjectSpecTools } from "./tools/projectSpec.tools.js";
import { registerTaskTools } from "./tools/task.tools.js";
import { registerTestArtifactTools } from "./tools/testArtifact.tools.js";

function buildServer(): McpServer {
  const server = new McpServer({ name: "ai-pm-mcp", version: "0.1.0" });

  registerProjectSpecTools(server);
  registerTaskTools(server);
  registerTestArtifactTools(server);

  return server;
}

const app = express();

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

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

app.listen(PORT, () => {
  console.log(`mcp-server listening on: ${PORT}`);
});
