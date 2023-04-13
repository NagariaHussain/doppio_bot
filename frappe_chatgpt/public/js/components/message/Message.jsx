import * as React from "react";

import MessageBubble from "./MessageBubble";
import MessageRenderer from "./MessageRenderer";
import MessageLoadingSkeletonText from "./MessageLoadingSkeletonText";

const Message = ({ message }) => {
  const fromAI = message.from === "ai";
  return (
    <MessageBubble key={message.content} fromAI={fromAI}>
      {!message.isLoading ? (
        <MessageRenderer content={message.content} />
      ) : (
        <MessageLoadingSkeletonText />
      )}
    </MessageBubble>
  );
};

export default Message;
