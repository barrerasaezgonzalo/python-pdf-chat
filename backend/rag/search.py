from config import (
    MATCH_THRESHOLD,
    MATCH_COUNT
)

from services.ollama_service import (
    obtener_vector,
    generar_respuesta
)

from services.supabase_service import (
    buscar_documentos
)


def preguntar(pregunta, document_name): 
    vector = obtener_vector(pregunta)

    resultados = buscar_documentos(
        vector,
        MATCH_THRESHOLD,
        MATCH_COUNT,
        document_name # <-- Lo pasamos aquí
    )

    if not resultados:
        return "No encontré información sobre este documento específico."

    contexto = "\n".join(r["contenido"] for r in resultados)

    return generar_respuesta(pregunta, contexto)