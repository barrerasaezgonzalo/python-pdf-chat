import os
import requests
from config import OLLAMA_URL, EMBED_MODEL, CHAT_MODEL, GROK_URL
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv("GROQ_API_KEY"),
    base_url=GROK_URL
)

def obtener_vector(texto):
    response = requests.post(
        f"{OLLAMA_URL}/api/embeddings",
        json={
            "model": EMBED_MODEL,
            "prompt": texto
        }
    )

    return response.json()["embedding"]


def generar_respuesta(pregunta, contexto):
    prompt_completo = f"""
    Contexto:
    {contexto}

    Pregunta:
    {pregunta}

    Responde solo usando el contexto.
    """

    response = client.chat.completions.create(
        model=CHAT_MODEL,
        messages=[
            {"role": "system", "content": "Eres un asistente útil que responde basado en el contexto proporcionado."},
            {"role": "user", "content": prompt_completo}
        ],
        temperature=0.2
    )

    return response.choices[0].message.content