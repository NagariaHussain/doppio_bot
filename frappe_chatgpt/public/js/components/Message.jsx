import * as React from "react";

import {
  Flex,
  Text,
  SkeletonText,
  Table,
  Thead,
  Tbody,
  TableContainer,
  Tr,
  Td,
  Th,
} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

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
        <ReactMarkdown
          children={message.content}
          components={{
            p: ({ node, ...props }) => <Text color="white" mb="0" {...props} />,
            table: ({ node, ...props }) => (
              <TableContainer bg={"white"} mt="1.5" rounded="sm">
                <Table p={"1"} size={"sm"} variant={"simple"} {...props} />
              </TableContainer>
            ),
            thead: ({ node, ...props }) => <Thead {...props} />,
            tbody: ({ node, ...props }) => <Tbody {...props} />,
            tr: ({ node, ...props }) => <Tr {...props} />,
            td: ({ node, ...props }) => <Td {...props} />,
            th: ({ node, ...props }) => <Th {...props} />,
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  {...props}
                  children={String(children).replace(/\n$/, "")}
                  style={atomDark}
                  language={match[1]}
                  PreTag="div"
                />
              ) : (
                <code {...props} className={className}>
                  {children}
                </code>
              );
            },
          }}
          remarkPlugins={[remarkGfm]}
        />
      ) : (
        <SkeletonText width="20" noOfLines={1} spacing="4" skeletonHeight="2" />
      )}
    </Flex>
  );
};

export default Message;
