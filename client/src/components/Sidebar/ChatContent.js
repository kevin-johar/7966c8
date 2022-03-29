import React from "react";
import { Badge, Box, Typography } from "@material-ui/core";
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
    // If you're last sender, or if the last sent message is your last message read:
    // you've read all messages
    if (lastMessage?.senderId === currentUser?.id || lastMessage?.id === lastReadMessageId) {
      return 0;
    }

    // If conversation has never been opened, there would be no lastRead property
    if(!conversation?.lastRead) {
      return messages?.length;
    }

    // If lastRead.messageId is not equal to the last message in the conversation
    const index = messages.findIndex((message) => message?.id === lastReadMessageId);
    return (index !== -1 ? [...messages].splice(index+1).length : 0);
  };

  const unreadMessages = numberOfUnreadMessages();
  const unreadBold = unreadMessages !== 0 ? classes.unread : '';

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
      {unreadMessages > 0 && <Badge badgeContent={unreadMessages}
                                    max={99}
                                    style={{top: "20px", right: "35px"}}
                                    color="primary">
      </Badge>}
    </Box>
  );
};

export default ChatContent;
