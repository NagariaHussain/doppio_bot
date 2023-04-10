import * as React from "react";

import { Flex, Text, SkeletonText } from "@chakra-ui/react";

const Message = ({ message }) => {
  const fromAI = message.from === "ai";
  return (
    <Flex
      direction={"column"}
      p={"4"}
      key={message.content}
      alignSelf={fromAI ? "start" : "end"}
      justify={"center"}
      backgroundColor={fromAI ? "blackAlpha.800" : "linkedin.500"}
      rounded={"xl"}
      width={"fit-content"}
      roundedTopLeft={fromAI ? "0" : "xl"}
      roundedTopRight={fromAI ? "xl" : "0"}
    >
      {!message.isLoading ? (
        <Text color={"white"} mb={"0"}>
          {message.content}
        </Text>
      ) : (
        <SkeletonText width="20" noOfLines={1} spacing="4" skeletonHeight="2" />
      )}
    </Flex>
  );
};

export default Message;
