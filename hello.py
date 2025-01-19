import happy_llama
import json


def main():
    print("Hello from nwhacks2025!")
    llm_instance = happy_llama.Llm()
    context = "Headache medicine: Ibuprofen, Acetaminophen, Aspirin"
    prompt = "I have a headache and a sore throat what medicine should I get?"
    llm_instance.set_prompt(prompt, context)
    output = llm_instance.get_response()
    print(str(output["choices"])[1:-1].replace("'", '"'))
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
