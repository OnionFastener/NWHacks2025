from llama_cpp import Llama


class Llm:
    _prompt = "Answer the question in a few words using the context below and your own knowledge. If question doesn't match context, ignore context, recommend doctor."
    _context = " Context: "
    _question = " Question: "

    def __init__(self):
        self._llm = Llama(
            model_path="./models/Llama-3.2-1B-Instruct-Q6_K_L.gguf",
            n_gpu_layers=-1,
        )

    def set_prompt(self, prompt, context):
        self._prompt = (
            # self._prompt
            # + self._context
            # + context
            self._question
            + prompt
            + " Answer: "
        )

    def get_response(self):
        output = self._llm(
            self._prompt,
            max_tokens=64,
            echo=False,
        )
        return output

    def embed_response(self, response):
        return self._llm.create_embedding(response)

    def print_response(
        self,
        prompt=_prompt,
        context="You are a helpful assistant with lots of knowledge in medicine",
    ):
        if prompt == "":
            print("empty prompt!")
            return
        self.set_prompt(prompt, context)
        print(self.get_response())
