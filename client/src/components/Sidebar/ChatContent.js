import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17,
  },
  unread: {
    color: "#000000",
    fontWeight: "bold",
  },
  unreadNumberContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 15px'
  },
  unreadNumber: {
    backgroundColor: "#0084FF",
    color: "#FFFFFF",
    borderRadius: '50%',
    aspectRatio: 1,
    height: '24px',
    textAlign: 'center',
  }
}));

const ChatContent = ({ conversation, currentUser }) => {
  const classes = useStyles();

  const { otherUser, messages } = conversation;
  const latestMessageText = conversation.id && conversation.latestMessageText;
  
  const lastReadMessageId = conversation?.lastRead?.messageId;

  const lastMessage = messages[messages?.length - 1];

  const numberOfUnreadMessages = () => {
    // If lastRead.messageId is not equal to the last message in the conversation
    if (lastMessage?.id !== lastReadMessageId && lastMessage?.senderId !== currentUser?.id) {
      const index = messages.findIndex((message) => message?.id === lastReadMessageId);
      return (index !== -1 ? [...messages].splice(index+1).length : 0);
    }
    return 0;
  };

  const unreadBold = numberOfUnreadMessages() !== 0 ? classes.unread : '';

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={`${classes.previewText} ${unreadBold}`}>
          {latestMessageText}
        </Typography>
      </Box>
      {numberOfUnreadMessages() > 0 && <Box className={classes.unreadNumberContainer}>
        <Typography className={classes.unreadNumber}>
          { numberOfUnreadMessages() }
        </Typography>
      </Box>}
    </Box>
  );
};

export default ChatContent;
