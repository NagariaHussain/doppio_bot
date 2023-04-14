## DoppioBot

ChatGPT in the Desk, powered by React & LangChain (with OpenAI LLM)

## Features

### ChatUI


### API

## Advanced Example: Agent with Custom Tool

Here is an example of an conversational agent that uses a custom tool that creates a ToDo document in the Frappe backend:

```python
from langchain import OpenAI
from langchain.agents import tool
from langchain.agents import AgentType
from langchain.memory import ConversationBufferMemory
from langchain.agents import initialize_agent

llm = OpenAI(temperature=0)
memory = ConversationBufferMemory(memory_key="chat_history")
tools = [create_todo]

agent_chain = initialize_agent(
 tools,
 llm,
 agent=AgentType.CONVERSATIONAL_REACT_DESCRIPTION,
 verbose=True,
 memory=memory,
)

# Will call the tool with proper JSON and voila, magic!
agent.run("I have to create a college report before May 17, 2023, can you set a task for me?")
```

The tool that creates new `ToDo` documents in Frappe:

```python
@tool
def create_todo(todo: str) -> str:
 """
 Create a new ToDo document, can be used when you need to store a note or todo or task for the user.
 It takes a json string as input and requires at least the `description`. Returns "done" if the
 todo was created and "failed" if the creation failed. Optionally it could contain a `date`
 field (in the JSON) which is the due date or reminder date for the task or todo. The `date` must follow
 the "YYYY-MM-DD" format. You don't need to add timezone to the date.
 """
 try:
  data = frappe.parse_json(todo)
  todo = frappe.new_doc("ToDo")
  todo.update(data)
  todo.save()
  return "done"
 except Exception:
  return "failed"
```

Learn more about creating custom tools [here](https://python.langchain.com/en/latest/modules/agents/tools/custom_tools.html).

#### License

AGPL-3.0
