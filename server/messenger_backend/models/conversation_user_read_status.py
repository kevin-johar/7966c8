from django.db import models
from django.db.models import Q

from . import utils
from .conversation import Conversation
from .user import User

class ConversationUserReadStatus(utils.CustomModel):
    conversationId = models.ForeignKey(
        Conversation, 
        on_delete=models.CASCADE,
        db_column="conversationId",
        related_name="+"
    )

    userId = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        db_column="userId",
        related_name="+"
    )

    class Meta: 
        constraints = [
            models.UniqueConstraint(
                fields = ["conversationId", "userId"]
            )
        ]

    # Necessary for debugging purposes
    createdAt = models.DateTimeField(auto_now_add=True, db_index=True)
    updatedAt = models.DateTimeField(auto_now=True)

    # Find read status timestamp given conversationId and userId
    def find_conversation_user_read_status(conversationId, userId):
        try:
            return ConversationReadStatus.objects.get(
                conversationId=conversationId, 
                userId=userId
            )
        except ConversationUserReadStatus.DoesNotExist:
            return None