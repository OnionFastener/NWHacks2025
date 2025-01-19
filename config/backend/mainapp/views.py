from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .python_files.llm_chat import generate_response


# Create your views here.
def chat(request):
    return render(request, "chat.html")


@csrf_exempt
def get_response(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            text = data.get("text", "")
            print(f"The user text is: {text}")
            result = ""
            for word in generate_response(text):
                result += word["choices"][0]["delta"]["content"]
            print(f"The respond is: {result}")
            return JsonResponse({"result": result})

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid data detected"}, status=400)

    return JsonResponse({"error": "A JSON request is needed"}, status=405)

