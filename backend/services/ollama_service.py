import requests
from config import OLLAMA_URL, EMBED_MODEL, CHAT_MODEL


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
    prompt = f"""
Contexto:
{contexto}

Pregunta:
{pregunta}

Responde solo usando el contexto.
"""

    response = requests.post(
        f"{OLLAMA_URL}/api/generate",
        json={
            "model": CHAT_MODEL,
            "prompt": prompt,
            "stream": False,
            "options": {
                "temperature": 0.2
            }
        }
    )

    return response.json()["response"]