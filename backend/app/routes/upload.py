from pathlib import Path

from fastapi import (
    APIRouter,
    UploadFile,
    File,
    BackgroundTasks,
    HTTPException
)

from rag.ingest import procesar_pdf
from services.supabase_service import (
    eliminar_documento
)
from services.upload_status import (
    set_error,
    set_processing,
    set_ready
)

router = APIRouter()

UPLOAD_DIR = Path(
    "storage"
)

UPLOAD_DIR.mkdir(
    parents=True,
    exist_ok=True
)

@router.post("/upload")
async def upload_pdf(background_tasks: BackgroundTasks, file: UploadFile = File(...)):
    if not file.filename.endswith(".pdf"):
       raise HTTPException(400, "Solo se permiten archivos PDF")

    path = UPLOAD_DIR / file.filename
    
    with open(path, "wb") as buffer:
        buffer.write(await file.read())
    
    eliminar_documento(file.filename)
    set_processing(file.filename)

    background_tasks.add_task(procesar_pdf_seguro, str(path), file.filename)

    return {"message": "Procesamiento iniciado", "file": file.filename}

def procesar_pdf_seguro(path, filename):
    try:
        procesar_pdf(path)
        set_ready(filename) 
    except Exception as e:
        print(f"Error crítico en background task para {filename}: {e}")
        set_error(filename)