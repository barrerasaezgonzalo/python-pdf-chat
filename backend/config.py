import os
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
GROK_URL = "https://api.groq.com/openai/v1"
OLLAMA_URL = "http://localhost:11434"
EMBED_MODEL = "nomic-embed-text"
CHAT_MODEL = "llama-3.1-8b-instant"
CHUNK_SIZE = 1000
MATCH_THRESHOLD = 0.5
MATCH_COUNT = 8