from app.config import MCP_SERVER_URL
from google.adk.tools.mcp_tool import McpToolset
from google.adk.tools.mcp_tool.mcp_session_manager import StreamableHTTPConnectionParams


def build_mcp_toolset(tool_filter: list[str] | None = None) -> McpToolset: 
  """ A fresh McpToolset per agent - Every agent in the hierarchy gets its own instance with a tool_filter
  instead of sharing one across the process."""

  return McpToolset(
    connection_params=StreamableHTTPConnectionParams(
      url=MCP_SERVER_URL,
      timeout=10, #seconds to connect 
      sse_read_timeout=300,
    ),
    tool_filter=tool_filter, 
  )
  