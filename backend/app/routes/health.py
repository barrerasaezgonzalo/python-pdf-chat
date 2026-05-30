@router.get("/health")
async def health_check():
    try:
        supabase.table("py_documentos").select("count", count="exact").limit(1).execute()
        return {"status": "ok", "db": "connected"}
    except Exception as e:
        return {"status": "error", "detail": str(e)}