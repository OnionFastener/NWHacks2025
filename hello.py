import happy_llama


def main():
    print("Hello from nwhacks2025!")
    llm_instance = happy_llama.Llm()
    context = "Headache medicine: Ibuprofen, Acetaminophen, Aspirin"
    prompt = "I have a headache and a sore throat what medicine should I get?"
    llm_instance.set_prompt(prompt, context)
    output = llm_instance.get_response()
    print(output.choices)


if __name__ == "__main__":
    main()
