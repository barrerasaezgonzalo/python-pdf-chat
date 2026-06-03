# 🚀 Contexta RAG

Una aplicación inteligente de chat con documentos basada en RAG (Retrieval-Augmented Generation). Permite a los usuarios subir documentos PDF, procesarlos y chatear con ellos utilizando la potencia de Llama 3.

## ✨ Características principales

- **Chat con Documentos:** Interacción fluida con el contenido de tus archivos.
- **Interfaz Moderna:** Construida con React, Tailwind CSS y componentes de `lucide-react`.
- **Backend Robusto:** API desarrollada en Python con FastAPI y procesamiento asíncrono (`BackgroundTasks`).
- **Seguridad:** Confirmaciones mediante modales para acciones críticas (cambio de chat y eliminación de archivos).
- **Persistencia:** Historial guardado y gestionado a través de Supabase.

## 🧠 Arquitectura de IA

Este proyecto utiliza un enfoque híbrido para el procesamiento de lenguaje natural:

- **Embeddings:** Procesamiento local mediante [Ollama](https://ollama.com/) para garantizar privacidad y control total.
- **Inferencia (LLM):** Consultas a [Groq Cloud](https://groq.com/) para obtener respuestas de baja latencia utilizando Llama 3.

## 🛠 Stack Tecnológico

### Frontend

- **React + TypeScript**
- **Tailwind CSS**
- **Lucide React** (Iconografía)

### Backend

- **Python / FastAPI**
- **Supabase** (PostgreSQL + RLS + Storage)

## 📦 Estructura del Proyecto

```text
.
├── backend/          # API de FastAPI y lógica de IA
├── frontend/         # Aplicación de React
├── .gitignore        # Configuración de archivos ignorados
└── README.md         # Documentación del proyecto
```

## 🚀 Cómo empezar

Requisitos previos
Python 3.x

Node.js (v18+)

Cuenta en Supabase y API Key de Groq.

## Instalación

Clonar el repositorio:

Bash

```
git clone https://github.com/barrerasaezgonzalo/python-pdf-chat
cd python-pdf-chat
```

Configurar el Backend:

```
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
# Crea tu archivo .env con tus credenciales
uvicorn main:app --reload
```

Configurar el Frontend:

Bash

```
cd ../frontend
npm install
# Crea tu archivo .env con tus credenciales
npm run dev
```

## 📝 Contribuciones

¡Cualquier sugerencia o mejora es bienvenida!
