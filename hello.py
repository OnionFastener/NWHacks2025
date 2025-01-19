import happy_llama
import ast


async def print_output(chunk):
    print(chunk["choices"][0]["delta"]["content"], end="")


def main():
    print("Hello from nwhacks2025!")
    llm_instance = happy_llama.Llm()
    context = "Headache medicine: Ibuprofen, Acetaminophen, Aspirin"
    prompt = "I have a headache and a sore throat what medicine should I get?"
    output = llm_instance.send_prompt(prompt, context, print_output)

    # print(ast.literal_eval(str(output)))
    # print(
    #     json.loads(str(output["choices"]).replace("'", '"')[1:-1].replace("None", "0"))
    # )
    # print(
    #     str(
    #         json.loads(
    #             str(output["choices"]).replace("'", '"')[1:-1].replace("None", "0")
    #         )["text"]
    #     ).split("Answer: ")[1]
    # )


if __name__ == "__main__":
    main()
