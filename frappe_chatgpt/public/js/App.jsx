import * as React from "react";
import ChatView from "./Chatview";
import { nanoid } from 'nanoid'

export function App() {
	// Unique sessionID for chat memory/history
	return <ChatView sessionID={nanoid()} />;
}
