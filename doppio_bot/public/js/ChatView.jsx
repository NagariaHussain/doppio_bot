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
} from "@chakra-ui/react";
import { SendIcon } from "lucide-react";
import React, { useState } from "react";
import Message from "./components/message/Message";

const ChatView = ({ sessionID }) => {
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

    frappe
      .call("doppio_bot.api.get_chatbot_response", {
        prompt_message: promptMessage,
        session_id: sessionID,
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
      .catch((e) => {
        console.error(e);
        toast({
          title: "Something went wrong, check console",
          status: "error",
          position: "bottom-right",
        });
      });
  };

  return (
    <Flex
      direction={"column"}
      height={"77vh"}
      width={"100%"}
      maxWidth={"4xl"}
      mx={"auto"}
    >
      <Text fontSize="xl" fontWeight={"bold"} textColor={"gray.700"}>Ask DoppioBot</Text>
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
            return <Message key={message.content} message={message} />;
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
              onClick={handleSendMessage}
            />
          </Flex>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default ChatView;
