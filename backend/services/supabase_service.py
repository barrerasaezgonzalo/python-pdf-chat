from backend.services.upload_status import set_deleted
from supabase import create_client
from config import SUPABASE_URL, SUPABASE_KEY

supabase = create_client(
    SUPABASE_URL,
    SUPABASE_KEY
)

def guardar_documento(
    texto,
    vector,
    document_name
):
    return (
        supabase
        .table("py_documentos")
        .insert({
            "contenido": texto,
            "embedding": vector,
            "document_name": document_name
        })
        .execute()
    )


def buscar_documentos(
    vector,
    threshold,
    count,
    document_name
):
    response = supabase.rpc(
        "match_documentos",
        {
            "query_embedding": vector,
            "match_threshold": threshold,
            "match_count": count,
            "p_document_name": document_name
        }
    ).execute()

    return response.data

def eliminar_documento(document_name: str) -> bool:
    try:
        response = supabase.table("py_documentos") \
            .delete() \
            .eq("document_name", document_name) \
            .execute()
        set_deleted(document_name)
        
        return len(response.data) > 0
    except Exception as e:
        print(f"Error al eliminar en Supabase: {e}")
        return False
    
def guardar_mensaje(document_name: str, role: str, content: str):
    return (
        supabase
        .table("py_chats")
        .insert({
            "document_name": document_name,
            "role": role,
            "content": content
        })
        .execute()
    )