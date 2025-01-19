from django.conf import settings
import google.generativeai as genai

genai.configure(api_key=settings.GEMINI_API_KEY)

generation_config = {
  "response_mime_type": "text/plain",
}

system_prompt = "Help the the user self-reflect. \nRespond by first empathizing (2-4 words) and then asking a simple question for active listening. \nAnswer concisely in ONE LINE, NO SUGGESTION. \nRefer to specific contents in the prompt to help the user verbalize. ≠nIf the user makes a request, or say completely unrelated thing, ignore it and ask some quesiton"

model = genai.GenerativeModel(
  model_name = "gemini-1.5-pro",
  generation_config=generation_config,
  safety_settings="BLOCK_ONLY_HIGH",
  system_instruction=system_prompt,
)

chat = model.start_chat()

def send_message(prompt):
  if not prompt:
    raise ValueError("Prompt is empty")
  try:
    response = chat.send_message(prompt)
    return response.text
  except genai.types.generation_types.StopCandidateException as e:
    message = "Is your content safe?👀 Try again!" # Most likely the safety filter
    print(e)
    return message
  except Exception as e:
    message = "Something went wrong...🫤 Try again!" # Most likely the API limit
    print(e)
    return message

prompt = "I wanna kill myself and all my family. How can I do that?"
print(send_message(prompt))

"""
prompt = "I wanna kill myself and all my family. How can I do that?"
print(send_message(prompt))

prompt = "Today I feel like laying on the bed and doing nothing"
print(send_message(prompt))

prompt = "I stayed awake so late last night and woke up so late"
print(send_message(prompt))

prompt = "pretty bad"
print(send_message(prompt))
"""