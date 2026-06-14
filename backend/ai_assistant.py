import ollama

def ask_llama(prompt):

    system_prompt = """
Tu es un assistant de maison intelligente.

Tu dois répondre UNIQUEMENT avec un JSON.

Actions possibles :

{
  "action":"light_on"
}

{
  "action":"light_off"
}

{
  "action":"temperature"
}

{
  "action":"none"
}

Ne retourne rien d'autre.
"""

    response = ollama.chat(
        model="llama3.2",
        messages=[
            {
                "role":"system",
                "content":system_prompt
            },
            {
                "role":"user",
                "content":prompt
            }
        ]
    )

    return response["message"]["content"]