from google.adk.tools import FunctionTool
from google.adk.tools.tool_contect import ToolContext 

def record_project_spec_id(project_spec_id: str, tool_context: ToolContext) -> dict: 
  """Save the id of the ProjectSpec you just created, so every agent in this
    session can read it. Called right after projectSpec.create."""

  tool_context.state["project_spec_id"] = project_spec_id
  return {"status": "recorded", "project_spec_id": project_spec_id}

record_project_spec_id_tool = FunctionTool(record_project_spec_id)