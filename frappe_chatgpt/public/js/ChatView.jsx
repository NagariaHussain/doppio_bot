import {
  Flex,
  IconButton,
  Input,
  Box,
  Card,
  CardBody,
  Avatar,
  useToast,
} from "@chakra-ui/react";
import { SendIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

const ChatView = () => {
  // from Frappe!
  const userImageURL = frappe.user.image();
  const userFullname = frappe.user.full_name();

  const toast = useToast();
  const [promptMessage, setPromptMessage] = useState("");

  const handleSendMessage = () => {
    if (!inputMessage.trim().length) {
      return;
    }
    const data = inputMessage;

    setMessages((old) => [...old, { from: "me", text: data }]);
    setInputMessage("");

    setTimeout(() => {
      setMessages((old) => [...old, { from: "computer", text: data }]);
    }, 1000);
  };

  useEffect(() => {
    toast({
      title: "This is an experimental app",
      status: "warning",
      position: "bottom-right",
      isClosable: true,
    });
  });

  return (
    <Flex direction={"column"} height={"75vh"} width={"100%"}>
      {/* Chat Area */}
      <Box
        width={"100%"}
        height={"100%"}
        shadow={"lg"}
        rounded={"md"}
        backgroundColor={"white"}
      ></Box>

      {/* Prompt Area */}
      <Card mt={"1.5"}>
        <CardBody>
          <Flex gap={"1.5"} alignItems={"center"}>
            <Avatar name={userFullname} size={"sm"} src={userImageURL} />
            {/* Input Box */}
            <Input
              value={promptMessage}
              onChange={(event) => setPromptMessage(event.target.value)}
              onKeyDown={(event) => {
                if (event.code == "Enter" && promptMessage) {
                  console.log("enter key pressed with message", promptMessage);
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
