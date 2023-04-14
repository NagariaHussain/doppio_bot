import * as React from "react";

import { Flex } from "@chakra-ui/react";

const MessageBubble = ({ children, fromAI }) => {
  return (
    <Flex
      direction={"column"}
      p={"4"}
      alignSelf={fromAI ? "start" : "end"}
      justify={"center"}
      backgroundColor={fromAI ? "blackAlpha.800" : "linkedin.500"}
      rounded={"xl"}
      width={"fit-content"}
      maxW={{ base: "100%", sm: "55%" }}
      roundedTopLeft={fromAI ? "0" : "xl"}
      roundedTopRight={fromAI ? "xl" : "0"}
    >
      {children}
    </Flex>
  );
};

export default MessageBubble;
