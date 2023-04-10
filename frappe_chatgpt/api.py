import frappe

from langchain.llms import OpenAI
from langchain.memory import RedisChatMessageHistory, ConversationBufferMemory
from langchain.chains import ConversationChain


@frappe.whitelist()
def get_chatbot_response(session_id, prompt_message):
	# Throw if no key in site_config
	# Maybe extract and cache this (site cache)
	opeai_api_key = frappe.conf.get("openai_api_key")

	if not opeai_api_key:
		frappe.throw("Please set `openai_api_key` in site config")

	llm = OpenAI(temperature=0, openai_api_key=opeai_api_key)
	message_history = RedisChatMessageHistory(session_id=session_id)
	memory = ConversationBufferMemory(memory_key="history", chat_memory=message_history)
	conversation_chain = ConversationChain(llm=llm, memory=memory)

	return conversation_chain.run(prompt_message)
