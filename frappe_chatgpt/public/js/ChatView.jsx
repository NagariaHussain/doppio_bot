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
      from: "ai",
      isLoading: false,
      content: "How can I help you?",
    },
  ]);

  const handleSendMessage = () => {
    if (!promptMessage.trim().length) {
      return;
    }

    setMessages((old) => [
      ...old,
      { from: "human", content: promptMessage, isLoading: false },
      { from: "ai", content: "", isLoading: true },
    ]);
    setPromptMessage("");

    // Plan of Action
    frappe
      .call("frappe_chatgpt.api.get_chatbot_response", {
        prompt_message: promptMessage,
      })
      .then((response) => {
        setMessages((old) => {
          old.splice(old.length - 1, 1, {
            from: "ai",
            content: response.message,
            isLoading: false,
          });
          return [...old];
        });
      })
      .catch((e) => console.error(e));
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
    <Flex direction={"column"} height={"77vh"} width={"100%"}>
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
            const fromAI = message.from === "ai";
            return (
              // TODO: Extract a separate component
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
