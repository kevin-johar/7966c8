import React from 'react';
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
    marginRight: 11,
    marginTop: 6,
  }
}));

const Messages = (props) => {
  const { messages, otherUser, userId } = props;
  const classes = useStyles();

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

        const canShow = message?.id === otherUser?.lastRead?.messageId;

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
            {canShow && readIcon()}
          </Box>
        );
      })}
    </Box>
  );
};

export default Messages;
