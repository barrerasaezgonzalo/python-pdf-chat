import fitz
import os


def leer_pdf(path):
    if not os.path.exists(path):
        raise FileNotFoundError(path)

    doc = fitz.open(path)

    texto = ""

    for pagina in doc:
        texto += pagina.get_text()

    return texto