import * as React from "react";
import { Badge, Stack } from "@chakra-ui/react";

export function App() {
  return (
    <Stack direction="row">
      <Badge>Default</Badge>
      <Badge colorScheme="green">Success</Badge>
      <Badge colorScheme="red">Removed</Badge>
      <Badge colorScheme="purple">New</Badge>
    </Stack>
  );
}
