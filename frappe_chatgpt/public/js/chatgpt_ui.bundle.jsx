import * as React from "react";
import { App } from "./App";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";

class ChatGptUI {
  constructor({ wrapper, page }) {
    this.$wrapper = $(wrapper);
    this.page = page;
    this.init();
  }

  init() {
    const root = createRoot(this.$wrapper.get(0));
    root.render(
      <ChakraProvider>
        <App />
      </ChakraProvider>
    );
  }
}

frappe.provide("chatgpt.ui");
chatgpt.ui.ChatGptUI = ChatGptUI;
export default ChatGptUI;
