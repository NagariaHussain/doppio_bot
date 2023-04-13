import * as React from "react";
import { SkeletonText } from "@chakra-ui/react";

import MessageBubble from "./MessageBubble";
import MessageRenderer from "./MessageRenderer";

const Message = ({ message }) => {
  const fromAI = message.from === "ai";
  return (
    <MessageBubble key={message.content} fromAI={fromAI}>
      {!message.isLoading ? (
        <MessageRenderer content={message.content} />
      ) : (
        <SkeletonText
          maxWidth="100%"
          width="20"
          noOfLines={1}
          spacing="4"
          skeletonHeight="2"
        />
      )}
    </MessageBubble>
  );
};

export default Message;
