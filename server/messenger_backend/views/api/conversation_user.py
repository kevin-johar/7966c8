from rest_framework.views import APIView
from django.contrib.auth.middleware import get_user
from messenger_backend.models import ConversationUser
from django.http import HttpResponse, JsonResponse
from django.utils import timezone


class ConversationUserPair(APIView):
    def put(self, request, conversation_id):
        try:
            user = get_user(request)

            if user.is_anonymous:
                return HttpResponse(status=401)

            body = request.data
            message_id = body.get("lastReadMessageId")

            user_id = user.id

            conversationUser, created = ConversationUser.objects.update_or_create(
                conversation__id=conversation_id,
                user__id=user_id,
                defaults={'user_id': user_id, 'conversation_id': conversation_id, 'lastReadDate': timezone.now(),
                          'message_id': message_id}
            )
            return JsonResponse({"conversationId": conversation_id, "userId": user_id,
                                 "lastRead": {"date": conversationUser.lastReadDate, "messageId": message_id}})
        except Exception as e:
            print('Something\'s going wrong: ', e)
            return HttpResponse(status=500)
