import asyncio
from app.mcp.toolset import build_mcp_toolset


async def main():
  toolset = build_mcp_toolset()
  tools = await toolset.get_tools()
  print(f"Connected, {len(tools)} tools visible")
  for t in tools: 
    print(t.name)

if __name__ == "__main__":
  asyncio.run(main())