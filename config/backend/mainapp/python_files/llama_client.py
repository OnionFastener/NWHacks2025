import asyncio
from typing import Optional
from contextlib import AsyncExitStack
import threading

from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

from mainapp.python_files.happy_llama import Llm
import mainapp.python_files.llm_chat as llm_chat


class MCPClient:
    def __init__(self):
        # Initialize session and client objects
        self.session: Optional[ClientSession] = None
        self.exit_stack = AsyncExitStack()
        self.llm_instance = Llm()
        llm_chat.add_observer(self)

    # methods will go here
    async def connect_to_server(self, server_script_path: str):
        print("connecting to server...")
        command = "python"
        server_params = StdioServerParameters(
            command=command, args=[server_script_path], env=None
        )

        stdio_transport = await self.exit_stack.enter_async_context(
            stdio_client(server_params)
        )
        self.stdio, self.write = stdio_transport
        self.session = await self.exit_stack.enter_async_context(
            ClientSession(self.stdio, self.write)
        )
        print("initializing...")

        await self.session.initialize()

        # List available tools
        response = await self.session.list_tools()
        tools = response.tools
        print("\nConnected to server with tools:", [tool.name for tool in tools])

    def process_query(self, query: str):
        print("processing query")
        response = asyncio.run(self.session.list_tools())
        available_tools = [
            {
                "name": tool.name,
                "description": tool.description,
                "input_schema": tool.inputSchema,
            }
            for tool in response.tools
        ]

        # REPLACE WITH GOOD TODO
        context = "Headache medicine: Ibuprofen, Acetaminophen, Aspirin"

        # Llama call
        print("calling Llama")
        yield from self.llm_instance.send_prompt(query, context, append_string)

        # Process response and handle tool calls
        tool_results = []
        final_text = []

        # if str(response)[0] == "{":
        #     response = response["content"]

        # return "\n".join(final_text)

    async def cleanup(self):
        """Clean up resources"""
        await self.exit_stack.aclose()


async def append_string(chunk: str):
    return chunk["choices"][0]["delta"]["content"]


async def setup():
    server_path = "./mainapp/python_files/llama_server.py"
    client = MCPClient()
    try:
        await client.connect_to_server(server_path)
        # await client.chat_loop()
    finally:
        await client.cleanup()


def run_setup():
    asyncio.run(setup())
