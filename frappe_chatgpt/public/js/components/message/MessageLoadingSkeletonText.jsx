import * as React from "react";

import { SkeletonText } from "@chakra-ui/react";

const MessageLoadingSkeletonText = () => {
  return (
    <SkeletonText
      maxWidth="100%"
      width="20"
      noOfLines={1}
      spacing="4"
      skeletonHeight="2"
    />
  );
};

export default MessageLoadingSkeletonText;
