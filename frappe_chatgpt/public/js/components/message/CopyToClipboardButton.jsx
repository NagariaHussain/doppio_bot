import * as React from "react";

import { IconButton, useToast } from "@chakra-ui/react";
import { ClipboardIcon } from "lucide-react";

const CopyToClipboardButton = ({ contentToCopy }) => {
  const toast = useToast();

  const handleCopyToClipboardClick = async () => {
    await navigator.clipboard.writeText(contentToCopy);
    toast({
      title: "Copied to clipboard",
      status: "success",
      position: "bottom-right",
    });
  };

  return (
    <IconButton
      pos={"absolute"}
      top={"1.5"}
      right={"1.5"}
      size={"xs"}
      opacity={{ base: "1", sm: "0" }}
      _groupHover={{ opacity: 1 }}
      variant="outline"
      colorScheme="whiteAlpha"
      aria-label="Copy to Clipboard"
      icon={<ClipboardIcon size={"16"} />}
      onClick={handleCopyToClipboardClick}
    />
  );
};

export default CopyToClipboardButton;
