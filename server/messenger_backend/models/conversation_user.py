from django.db import models
from django.db.models import Q

from . import utils
from .conversation import Conversation
from .user import User

class ConversationUser(utils.CustomModel):
    conversation = models.ForeignKey(
        Conversation, 
        on_delete=models.CASCADE,
        db_column="conversationId",
        related_name="+"
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        db_column="userId",
        related_name="+"
    )

    class Meta: 
        constraints = [
            models.UniqueConstraint(
                fields = ['conversation', 'user'],
                name='conversation_user'
            )
        ]

    # Necessary for debugging purposes
    createdAt = models.DateTimeField(auto_now_add=True, db_index=True)
    # Tracks when last read status was
    updatedAt = models.DateTimeField(auto_now=True)

    def get_conversation_user(conversationId, userId):
        try:
            return ConversationUser.objects.get(
                Q(user__id=userId), 
                Q(conversation__id=conversationId)
            )
        except ConversationUser.DoesNotExist:
            print('No Conversation-User found!')
            return None