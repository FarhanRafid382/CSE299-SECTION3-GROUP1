from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import ollama


@csrf_exempt
def chat(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST request required"}, status=405)

    try:
        data = json.loads(request.body)
        message = data.get("message", "")

        response = ollama.chat(
            model="phi3:mini",      # Change this if using gemma3:1b
            messages=[
                {
                    "role": "user",
                    "content": message
                }
            ]
        )

        return JsonResponse({
            "user_message": message,
            "reply": response["message"]["content"]
        })

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)