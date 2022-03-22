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
    fontWeight: "bold"
  }
}));

const ChatContent = ({ conversation, currentUser }) => {
  const classes = useStyles();

  const { otherUser, messages } = conversation;
  const latestMessageText = conversation.id && conversation.latestMessageText;
  
  const messageId = conversation?.lastRead?.messageId;
  const lastMessage = messages[messages?.length - 1];
  console.log(lastMessage)
  // If lastRead.messageId is not equal to the last message in the conversation
  const unreadBold = lastMessage.id !== messageId && lastMessage?.senderId !== currentUser?.id ? classes.unread : '';

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
    </Box>
  );
};

export default ChatContent;
