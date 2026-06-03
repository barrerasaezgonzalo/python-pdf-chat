from pathlib import Path
from services.upload_status import  get_status
from fastapi import APIRouter, HTTPException

from services.supabase_service import (
    eliminar_documento
)
router = APIRouter()

DOCUMENTS_DIR = Path(
    "storage"
)
STATUS_DIR = Path(
    "storage/status"
)

@router.get("/documents")
async def get_documents():
    files = DOCUMENTS_DIR.glob("*.pdf")

    return [
        {
            "id": file.name,
            "name": file.name,
            "status": get_status(file.name)
        }
        for file in files
    ]

@router.delete("/documents/{document_name}")
async def delete_document(document_name: str):
    path = DOCUMENTS_DIR / document_name
    
    if not eliminar_documento(document_name):
        raise HTTPException(status_code=500, detail="Error al borrar en base de datos")
    
    if path.exists():
        path.unlink()
        
    return {"message": "Documento eliminado totalmente"}