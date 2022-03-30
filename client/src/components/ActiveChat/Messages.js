import React, { useMemo } from 'react';
import { Box, Avatar } from '@material-ui/core';
import { SenderBubble, OtherUserBubble } from '.';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  readIconContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%'
  },
  readIcon: {
    height: 15,
    width: 15,
    marginTop: 6,
    marginBottom: 15,
  }
}));

const Messages = (props) => {
  const { messages, otherUser, userId } = props;
  const classes = useStyles();

  const lastReadMessageId = useMemo(() => {
   const index = messages.findIndex(
     (message) => message?.id === otherUser?.lastRead?.messageId
   );

   // From lastReadMessageId index go backwards to find the message not sent by the other user
   for (let i = index; i >= 0; i--) {
     if (messages[i]?.senderId !== otherUser?.id) {
       return messages[i]?.id;
     }
   }
   return -1;
  }, [messages, otherUser?.lastRead?.messageId, otherUser?.id]);

  const readIcon = () =>
    <Box className={classes.readIconContainer}>
      <Avatar
        alt={otherUser.username}
        src={otherUser.photoUrl}
        className={classes.readIcon}
      />
    </Box>;

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format('h:mm');
        const canShow = lastReadMessageId >= 0 ? message?.id === lastReadMessageId: false;

        return message.senderId === userId ? (
          <Box key={message.id}>
            <SenderBubble
            text={message.text}
            time={time} />
            {canShow && readIcon()}
          </Box>
        ) : (
          <Box key={message.id} >
            <OtherUserBubble
              text={message.text}
              time={time}
              otherUser={otherUser}
            />
          </Box>
        );
      })}
    </Box>
  );
};

export default Messages;
