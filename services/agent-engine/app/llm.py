from google.adk.models.google_llm import gemini
from google.genai import types

from app.config import AGENT_MODEL

#as this project will be using free tier models initially, there is a retry option
RETRY = types.HttpRetryOptions(
  attempts = 5,
  initial_delay = 2.0,
  max_delay = 30.0,
  exp_base = 2.0,
  http_status_codes = [429, 500, 503]
)

#This is built only for gemini models which have a native support in adk
#For other models use LiteLlm
def build_model(): 
  """The model every agent uses."""
  return gemini(model=AGENT_MODEL, retry_options=RETRY)