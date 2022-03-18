from rest_framework.views import APIView
from django.http import HttpResponse, JsonResponse

class ConversationUser(APIView):
    def post(self, request, conversationId):
        try:
            body = request.data
            print(body)
            print(conversationId)
            # ConversationsUserReadStatus.find_conversation_user_read_status()
            return JsonResponse({'Recieved'})
        except Exception as e:
            print('Something\'s going wrong')
            return HttpResponse(status=500)