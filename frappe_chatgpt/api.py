import frappe

from langchain.llms import OpenAI
from langchain.chains import ConversationChain, LLMChain
from langchain.prompts import PromptTemplate

llm = OpenAI(temperature=0, openai_api_key=frappe.conf.get("openai_api_key"))


template = """You are friendly AI Chat Bot who interacts with Humans in a sweet and polite manner.

Human:
{prompt_message}
Bot:"""

prompt_template = PromptTemplate(input_variables=["prompt_message"], template=template)

# TODO: Later
# conversation_chain = ConversationChain(prompt=prompt_template)

conversation_chain = LLMChain(prompt=prompt_template, llm=llm)


@frappe.whitelist()
def get_chatbot_response(prompt_message):
	return conversation_chain.run(prompt_message)
