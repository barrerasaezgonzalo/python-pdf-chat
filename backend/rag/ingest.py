from pathlib import Path

from services.pdf_service import (
    leer_pdf
)

from services.ollama_service import (
    obtener_vector
)

from services.supabase_service import (
    guardar_documento
)

from services.upload_status import (
    set_error,
    set_ready
)

from utils.chunking import (
    crear_chunks
)
def procesar_pdf(path: str):
    file_name = Path(path).name
    try:
        texto = leer_pdf(path)
        if not texto:
            raise Exception("El PDF no contiene texto extraíble.")

        fragmentos = crear_chunks(texto)

        for fragmento in fragmentos:
            vector = obtener_vector(fragmento)
            guardar_documento(fragmento, vector, file_name)

        set_ready(file_name)
        print(f"✅ {file_name} procesado correctamente.")
        
    except Exception as e:
        print(f"❌ Error procesando {file_name}: {e}")
        set_error(file_name)