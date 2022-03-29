from rest_framework.views import APIView
from messenger_backend.models import ConversationUser
from django.http import HttpResponse, JsonResponse
from django.utils import timezone

class ConversationUserPair(APIView):
    def put(self, request, conversationId, userId):
        body = request.data
        messageId = body.get("lastReadMessageId")

        try:
            conversationUser, created = ConversationUser.objects.update_or_create(
                conversation__id=conversationId,
                user__id=userId,
                defaults={'user_id': userId, 'conversation_id': conversationId, 'lastReadDate': timezone.now(), 'message_id': messageId}
            )
            return JsonResponse({"conversationId": conversationId, "userId": userId, "lastRead": { "date": conversationUser.lastReadDate, "messageId": messageId }})
        except Exception as e:
            print('Something\'s going wrong: ', e)
            return HttpResponse(status=500)
