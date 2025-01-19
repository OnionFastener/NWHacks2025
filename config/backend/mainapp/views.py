from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .python_files.llm_chat import generate_response
from .python_files.gemini import send_message

# Create your views here.
def chat(request):
  return render(request, 'chat.html')

@csrf_exempt
def get_response(request):
  if request.method == 'POST':
    try:
      data =json.loads(request.body)
      text = data.get('text', '')
      print(f"The user text is: {text}") 
      result = generate_response(text)
      print(f"The respond is: {result}")
      return JsonResponse({ 'result': result })
    
    except json.JSONDecodeError:
      return JsonResponse({'error': 'Invalid data detected'}, status=400)
    
  return JsonResponse({'error': 'A JSON request is needed'}, status=405)

@csrf_exempt
def update_card_info(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            user_data = data.get('userData', {})
            chat_history = data.get('chatHistory', [])
            
            # Prepare context for Gemini
            context = f"""
            Current User Medical Information:
            - Allergies: {user_data.get('allergies', 'None')}
            - Medical Conditions: {user_data.get('medicalConditions', 'None')}
            
            Chat History:
            {' '.join([msg['text'] for msg in chat_history])}
            
            Based on the above information, analyze if there are any new medical conditions 
            or allergies mentioned in the chat that should be added to the user's profile (that is not already in the profile).
            """
            
            result = send_message(context)
            return JsonResponse({'result': result})
            
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid data'}, status=400)
            
    return JsonResponse({'error': 'Method not allowed'}, status=405)