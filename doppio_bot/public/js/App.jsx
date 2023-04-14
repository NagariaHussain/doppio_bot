import * as React from "react";
import { nanoid } from 'nanoid'

import ChatView from "./ChatView";

export function App() {
	// Unique sessionID for chat memory/history
	return <ChatView sessionID={nanoid()} />;
}
