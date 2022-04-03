from django.db import models
from django.db.models import Q
from django.utils import timezone

from . import utils
from .conversation import Conversation
from .user import User
from .message import Message

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

    # Can be null if a new conversation is made and otherUsers haven't opened it
    readMessage = models.ForeignKey(
        Message, 
        on_delete=models.CASCADE,
        db_column="messageId",
        related_name="+"
    )

    lastReadDate = models.DateTimeField(default=timezone.now)

    class Meta: 
        constraints = [
            models.UniqueConstraint(
                fields = ['conversation', 'user'],
                name='conversation_user'
            )
        ]

    # Necessary for debugging purposes
    createdAt = models.DateTimeField(auto_now_add=True, db_index=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def get_conversation_user(conversationId, userId):
        try:
            return ConversationUser.objects.get(
                Q(user_id=userId), 
                Q(conversation_id=conversationId)
            )
        except ConversationUser.DoesNotExist:
            print('No Conversation-User found!')
            return None