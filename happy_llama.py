from llama_cpp import Llama

llm = Llama(
    model_path="./models/Llama-3.2-1B-Instruct-Q6_K_L.gguf",
    n_gpu_layers=-1,
)

output = llm(
    "Q: I have a headache what medicine should I take? A: ",
    max_tokens=32,
    stop=["Q:", "\n"],
    echo=True,
)
print(output)
