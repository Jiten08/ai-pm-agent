from google.adk.tools import FunctionTool
from google.adk.tools.tool_context import ToolContext

def propose_hld_for_approval(hld_mermaid: str, tool_context: ToolContext) -> dict:
  """Show the drafted Mermaid HLD to the human and wait for approve/reject.
    Call this once the draft is saved with projectSpec.updateHld."""

  answer = tool_context.tool_confirmation

  if answer is None: 
    tool_context.request_confirmation(
      hint="Review the drafted architecture and approve or rehect it.",
      payload={"hld_mermaid": hld_mermaid, "feedback": ""}
    )
    return {"status": "awaiting_human_approval"}

  if not answer.confirmed: 
    feedback = (answer.payload or {}).get("feedback", "")
    return {"status": "rejected", "feedback": feedback}

  tool_context.state["hld_mermaid"] = hld_mermaid
  return {"status": "approved"}

hld_approval_tool = FunctionTool(propose_hld_for_approval)