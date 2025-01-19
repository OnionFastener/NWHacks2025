from llama_cpp import Llama


class Llm:
    _prompt = "Answer the question in a few words using the context below."
    _context = " Context: "
    _question = " Question: "

    def __init__(self):
        self._llm = Llama(
            model_path="./models/Llama-3.2-1B-Instruct-Q6_K_L.gguf",
            n_gpu_layers=-1,
        )

    def set_prompt(self, prompt, context):
        self._prompt = (
            self._prompt
            + self._context
            + context
            + self._question
            + prompt
            + " Answer: "
        )

    def get_response(self):
        output = self._llm(
            self._prompt,
            max_tokens=64,
            stop=["Question:", "\n"],
            echo=True,
        )
        return output

    def print_response(
        self, prompt=_prompt, context="You are a helpful medical assistant"
    ):
        if prompt == "":
            print("empty prompt!")
            return
        self.set_prompt(prompt, context)
        print(self.get_response())
