from config import CHUNK_SIZE


def crear_chunks(texto):
    return [
        texto[i:i + CHUNK_SIZE]
        for i in range(
            0,
            len(texto),
            CHUNK_SIZE
        )
    ]