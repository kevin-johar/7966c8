# Generated by Django 3.2.4 on 2022-03-18 21:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('messenger_backend', '0002_auto_20220316_1502'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='ConversationUserReadStatus',
            new_name='ConversationUser',
        ),
        migrations.RemoveConstraint(
            model_name='conversationuser',
            name='conversation_user_read_status',
        ),
        migrations.RenameField(
            model_name='conversationuser',
            old_name='conversationId',
            new_name='conversation',
        ),
        migrations.RenameField(
            model_name='conversationuser',
            old_name='userId',
            new_name='user',
        ),
        migrations.AddConstraint(
            model_name='conversationuser',
            constraint=models.UniqueConstraint(fields=('conversation', 'user'), name='conversation_user'),
        ),
    ]
