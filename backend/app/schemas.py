# app/schemas.py
from pydantic import BaseModel

class Pregunta(BaseModel):
    texto: str
    document_name: str