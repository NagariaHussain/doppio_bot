import * as React from "react";

import {
  Text,
  SkeletonText,
  Table,
  Thead,
  Tbody,
  TableContainer,
  Tr,
  Td,
  Th,
  Image,
} from "@chakra-ui/react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import CopyToClipboardButton from "./CopyToClipboardButton";
import MessageBubble from "./MessageBubble";

const Pre = (props) => {
  const { codeString, ...otherProps } = props;

  return (
    <div
      role="group"
      {...otherProps}
      style={{ ...otherProps.style, position: "relative" }}
    >
      {otherProps.children}
      <CopyToClipboardButton contentToCopy={codeString} />
    </div>
  );
};

const Message = ({ message }) => {
  const fromAI = message.from === "ai";
  return (
    <MessageBubble key={message.content} fromAI={fromAI}>
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
            img: ({ node, ...props }) => (
              <Image
                rounded={"sm"}
                boxSize={"32"}
                objectFit={"cover"}
                {...props}
              />
            ),
            thead: ({ node, ...props }) => <Thead {...props} />,
            tbody: ({ node, ...props }) => <Tbody {...props} />,
            tr: ({ node, ...props }) => <Tr {...props} />,
            td: ({ node, ...props }) => <Td {...props} />,
            th: ({ node, ...props }) => <Th {...props} />,
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              const codeString = String(children).replace(/\n$/, "");
              return !inline && match ? (
                <SyntaxHighlighter
                  {...props}
                  children={codeString}
                  style={atomDark}
                  language={match[1]}
                  PreTag={(props) => <Pre codeString={codeString} {...props} />}
                />
              ) : (
                <code {...props} className={className}>
                  {children}
                </code>
              );
            },
          }}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
        />
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
