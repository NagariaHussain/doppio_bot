## DoppioBot

https://user-images.githubusercontent.com/34810212/233836702-c626bd91-4016-4731-89b0-a09c21e433c4.mp4

ChatGPT experience, built right into Frappe's desk interface.

## BTS

You can read more on how DoppioBot is built and how to use it in [this](https://frappe.io/blog/engineering/introducing-doppiobot-template) blog post.

## Features

![DoppioBot Feature Sneak](https://user-images.githubusercontent.com/34810212/233836622-eac2011c-f84d-476d-926f-2e08da2b396d.png)

### ChatUI


![doppio_bot_cover_image](https://user-images.githubusercontent.com/34810212/233837411-68359b1d-8a5a-4f7e-bf13-45f534cb6d64.png)



### API

![bot_fun_chat](https://user-images.githubusercontent.com/34810212/233836619-7d8eca87-a177-4659-bef1-7dbbf699cca7.png)

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

MIT
