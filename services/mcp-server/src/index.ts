import { McpServer } from "@modelcontextprotocol/server";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp";
import express from "express";
import * as z from "zod";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const server = new McpServer({
  name: "ai-pm",
  version: "0.1.0",
});
