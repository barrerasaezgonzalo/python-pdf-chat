const API_BASE = "http://127.0.0.1:8000";

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.detail ||
        `Error ${response.status}: Ocurrió un problema en el servidor`,
    );
  }
  return response.json();
};

export const api = {
  getDocuments: async () => {
    const response = await fetch(`${API_BASE}/documents`);
    const documents = await handleResponse(response);

    return documents;
  },

  uploadDocument: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_BASE}/upload`, {
      method: "POST",
      body: formData,
    });
    return handleResponse(response);
  },

  deleteDocument: async (fileName: string) => {
    const response = await fetch(`${API_BASE}/documents/${fileName}`, {
      method: "DELETE",
    });
    return handleResponse(response);
  },

  sendMessage: async ({
    query,
    fileName,
  }: {
    query: string;
    fileName: string;
  }) => {
    const response = await fetch(`${API_BASE}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texto: query, document_name: fileName }),
    });
    return handleResponse(response);
  },
};
