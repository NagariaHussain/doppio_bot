import frappe

from langchain.llms import OpenAI
from langchain.memory import RedisChatMessageHistory, ConversationBufferMemory
from langchain.chains import ConversationChain
from langchain.prompts import PromptTemplate

OPENAI_MODEL_NAME = "gpt-3.5-turbo"

# Note: Copied the default template and added extra instructions for code output
prompt_template = PromptTemplate(
	input_variables=["history", "input"],
	output_parser=None,
	partial_variables={},
	template="""
	The following is a friendly conversation between a human and an AI.
	The AI is talkative and provides lots of specific details from its context. The AI's name is DoppioBot and it's birth date it 24th April, 2023.
	If the AI does not know the answer to a question, it truthfully says it does not know. 
	Any programming code should be output in a github flavored markdown code block mentioning the programming language.
	
	
	Current conversation:
	{history}
	Human: {input}
	AI:""",
	template_format="f-string",
	validate_template=True,
)


@frappe.whitelist()
def get_chatbot_response(session_id: str, prompt_message: str) -> str:
	# Throw if no key in site_config
	# Maybe extract and cache this (site cache)
	opeai_api_key = frappe.conf.get("openai_api_key")

	if not opeai_api_key:
		frappe.throw("Please set `openai_api_key` in site config")

	llm = OpenAI(model_name=OPENAI_MODEL_NAME, temperature=0, openai_api_key=opeai_api_key)
	message_history = RedisChatMessageHistory(
		session_id=session_id,
		url=frappe.conf.get("redis_cache") or "redis://localhost:6379/0",
	)
	memory = ConversationBufferMemory(memory_key="history", chat_memory=message_history)
	conversation_chain = ConversationChain(llm=llm, memory=memory, prompt=prompt_template)

	response = conversation_chain.run(prompt_message)
	return response
