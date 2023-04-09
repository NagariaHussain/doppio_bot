import {
  Flex,
  IconButton,
  VStack,
  Box,
  Card,
  CardBody,
  Avatar,
  useToast,
  Textarea,
  Text,
  SkeletonText,
} from "@chakra-ui/react";
import { SendIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

const ChatView = () => {
  // from Frappe!
  const userImageURL = frappe.user.image();
  const userFullname = frappe.user.full_name();

  const toast = useToast();
  const [promptMessage, setPromptMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      from: "bot",
      isLoading: false,
      content: "How can I help you?",
    },
    {
      from: "user",
      isLoading: false,
      content: "What do folks at Frappe do?",
    },
    {
      from: "bot",
      isLoading: true,
      content: "",
    },
  ]);

  const handleSendMessage = () => {
    if (!promptMessage.trim().length) {
      return;
    }
    const data = promptMessage;

    setMessages((old) => [...old, { from: "user", content: data }]);
    setPromptMessage("");

    setTimeout(() => {
      setMessages((old) => [...old, { from: "bot", content: data }]);
    }, 1000);
  };

  useEffect(() => {
    toast({
      title: "This is an experimental app",
      status: "warning",
      position: "bottom-right",
      isClosable: true,
    });
  }, []);

  return (
    <Flex direction={"column"} height={"75vh"} width={"100%"}>
      {/* Chat Area */}
      <Box
        width={"100%"}
        height={"100%"}
        overflowY="scroll"
        shadow={"xl"}
        rounded={"md"}
        backgroundColor={"white"}
      >
        <VStack spacing={2} align="stretch" p={"2"}>
          {messages.map((message) => {
            const fromBot = message.from === "bot";
            return (
              <Flex
                direction={"column"}
                p={"4"}
                key={message.content}
                alignSelf={fromBot ? "start" : "end"}
                justify={"center"}
                backgroundColor={fromBot ? "blackAlpha.800" : "linkedin.500"}
                rounded={"xl"}
                width={"fit-content"}
                roundedTopLeft={fromBot ? "0" : "xl"}
                roundedTopRight={fromBot ? "xl" : "0"}
              >
                {!message.isLoading ? (
                  <Text color={"white"} mb={"0"}>
                    {message.content}
                  </Text>
                ) : (
                  <SkeletonText
                    width="20"
                    noOfLines={1}
                    spacing="4"
                    skeletonHeight="2"
                  />
                )}
              </Flex>
            );
          })}
        </VStack>
      </Box>

      {/* Prompt Area */}
      <Card mt={"1.5"}>
        <CardBody>
          <Flex gap={"1.5"} alignItems={"start"}>
            <Avatar name={userFullname} size={"sm"} src={userImageURL} />
            {/* Input Box */}
            <Textarea
              value={promptMessage}
              onChange={(event) => setPromptMessage(event.target.value)}
              onKeyDown={(event) => {
                if (event.code == "Enter" && event.metaKey && promptMessage) {
                  console.log("enter key pressed with message", promptMessage);
                  handleSendMessage();
                  setPromptMessage("");
                }
              }}
              placeholder="Type your message here..."
            />

            {/* Send Button */}
            <IconButton
              aria-label="Send Prompt Message"
              icon={<SendIcon height={16} />}
            />
          </Flex>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default ChatView;
