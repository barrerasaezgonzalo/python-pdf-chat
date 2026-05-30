from fastapi import (
    APIRouter
)

from services.upload_status import (
    get_status
)


router = APIRouter()


@router.get(
    "/documents/status/{file_name}"
)
async def document_status(
    file_name: str
):
    return {
        "file":
            file_name,
        "status":
            get_status(
                file_name
            )
    }