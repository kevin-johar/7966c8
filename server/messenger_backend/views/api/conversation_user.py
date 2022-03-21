from rest_framework.views import APIView
from messenger_backend.models import ConversationUser
from django.http import HttpResponse, JsonResponse

class ConversationUserPair(APIView):
    def post(self, request, conversationId, userId):
        try:
            conversationUser, created = ConversationUser.objects.update_or_create(
                conversation__id=conversationId,
                user__id=userId,
                defaults={'user_id': userId, 'conversation_id': conversationId}
            )
            return JsonResponse({"conversationId": conversationId, "userId": userId, "lastRead": conversationUser.updatedAt})
        except Exception as e:
            print('Something\'s going wrong: ', e)
            return HttpResponse(status=500)