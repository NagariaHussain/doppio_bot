import * as React from "react";

import {
  Text,
  Table,
  Thead,
  Tbody,
  TableContainer,
  Tr,
  Td,
  Th,
  Image,
  Heading,
  ListItem,
  UnorderedList,
  OrderedList,
} from "@chakra-ui/react";

import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import CopyToClipboardButton from "./CopyToClipboardButton";

const MessageRenderer = ({ content }) => {
  return (
    <ReactMarkdown
      children={content}
      components={markdownRenderComponentOverrides}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
    />
  );
};

const markdownRenderComponentOverrides = {
  p: ({ node, ...props }) => <Text color="white" mb="0" {...props} />,
  h1: ({ node, ...props }) => <Heading color="white" as="h1" {...props} />,
  h2: ({ node, ...props }) => <Heading color="white" as="h2" {...props} />,
  h3: ({ node, ...props }) => <Heading color="white" as="h3" {...props} />,
  h4: ({ node, ...props }) => <Heading color="white" as="h4" {...props} />,
  li: ({ node, ...props }) => <ListItem color="white" {...props} />,
  ul: ({ node, ...props }) => <UnorderedList {...props} />,
  ol: ({ node, ...props }) => <OrderedList {...props} />,
  table: ({ node, ...props }) => (
    <TableContainer bg={"white"} mt="1.5" rounded="sm">
      <Table p={"1"} size={"sm"} variant={"simple"} {...props} />
    </TableContainer>
  ),
  img: ({ node, ...props }) => (
    <Image rounded={"sm"} boxSize={"32"} objectFit={"cover"} {...props} />
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
        PreTag={(props) => (
          <PreWithClickToCopyButton codeString={codeString} {...props} />
        )}
      />
    ) : (
      <code {...props} className={className}>
        {children}
      </code>
    );
  },
};

const PreWithClickToCopyButton = (props) => {
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

export default MessageRenderer;
