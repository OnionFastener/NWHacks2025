from llama_cpp import Llama
from llama_cpp import llama_types
import asyncio


class Llm:
    _context = []

    def __init__(self):
        self._llm = Llama(
            model_path="./models/Llama-3.2-1B-Instruct-Q6_K_L.gguf",
            n_gpu_layers=-1,
            n_ctx=4096,
        )
        self._context.append(
            {
                "role": "system",
                "content": "You are a helpful and knowledgeable medical assistant who gives brief correct answers including recommended medications. Maximum 3 sentences per response.",
            }
        )

    def send_prompt(self, prompt, context, callback=None):
        self._context.append({"role": "user", "content": prompt})
        self._context.append({"role": "tool", "content": context})
        print("getting response")
        yield from self.get_response()
        # print(response["choices"][0]["message"])
        # self._context.append(
        #     {"role": "assistant", "content": response["choices"][0]["message"]}
        # )

    def get_response(self):
        for chunk in self._llm.create_chat_completion(
            self._context, max_tokens=512, stream=True
        ):
            if "content" in chunk["choices"][0]["delta"]:
                yield chunk
