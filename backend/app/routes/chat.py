from fastapi import APIRouter
from app.schemas import Pregunta
from rag.search import preguntar
from services.supabase_service import guardar_mensaje

router = APIRouter()

@router.post("/chat")
async def chat(
    pregunta: Pregunta
):
    guardar_mensaje(pregunta.document_name, "user", pregunta.texto)
    respuesta = preguntar(pregunta.texto, pregunta.document_name)
    guardar_mensaje(pregunta.document_name, "assistant", respuesta)

    return {
        "respuesta": respuesta
    }