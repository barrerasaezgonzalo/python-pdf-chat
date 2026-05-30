from pathlib import Path


STATUS_DIR = Path(
    "storage/status"
)

STATUS_DIR.mkdir(
    parents=True,
    exist_ok=True
)


def set_processing(
    file_name: str
):
    path = (
        STATUS_DIR /
        f"{file_name}.txt"
    )

    path.write_text(
        "processing"
    )


def set_ready(
    file_name: str
):
    path = (
        STATUS_DIR /
        f"{file_name}.txt"
    )

    path.write_text(
        "ready"
    )


def get_status(
    file_name: str
):
    path = (
        STATUS_DIR /
        f"{file_name}.txt"
    )

    if not path.exists():
        return "unknown"

    return path.read_text()

def set_deleted(
    file_name: str
):
    path = (
        STATUS_DIR /
        f"{file_name}.txt"
    )

    path.write_text(
        "deleted"
    )

def set_error(
    file_name: str
):
    path = (
        STATUS_DIR /
        f"{file_name}.txt"
    )

    path.write_text(
        "error"
    )