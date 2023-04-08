import * as React from "react";
import { createRoot } from "react-dom/client";

class ChatGptUI {
  constructor({ wrapper, page }) {
    this.$wrapper = $(wrapper);
    this.page = page;
    this.init();
  }

  init() {
    const root = createRoot(this.$wrapper.get(0));
    root.render(<h3>Bye, world</h3>);
  }
}

frappe.provide("chatgpt.ui");
chatgpt.ui.ChatGptUI = ChatGptUI;
export default ChatGptUI;
