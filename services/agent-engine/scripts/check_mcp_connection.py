import asyncio

from app.mcp.toolset import build_mcp_toolset


async def main() -> None: 
  toolset = build_mcp_toolset()
  try: 
    tools = await toolset.get_tools()
    for tool in tools: 
      print(tool.name)
  finally: 
    await toolset.close()

if __name__ == "__main__":
  asyncio.run(main())