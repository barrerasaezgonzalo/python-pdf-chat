import { useDocumentContext } from "../context/DocumentContext";
import { api } from "../services/api";

export const useDocuments = () => {
  const { documents, setDocuments, setSelectedDoc } = useDocumentContext();
  const fetchDocuments = async () => {
    const newDocs = await api.getDocuments();
    setDocuments((prev) => {
      const map = new Map(prev.map((d) => [d.id, d.status]));
      const changed = newDocs.some(
        (d: { id: string; status: string | undefined }) =>
          map.get(d.id) !== d.status,
      );
      if (!changed) return prev;
      return newDocs;
    });
  };

  const deleteDocument = async (id: string) => {
    try {
      await api.deleteDocument(id);
      setDocuments((prev) => prev.filter((doc) => doc.id !== id));
      setSelectedDoc(null);
    } catch (error) {
      console.error("Error al borrar:", error);
    }
  };

  const handleUpload = async (file: File) => {
    try {
      await api.uploadDocument(file);
    } catch (error) {
      console.error("Error al llamar al servicio:", error);
      throw error;
    }
  };

  return {
    fetchDocuments,
    deleteDocument,
    documents,
    uploadDocument: handleUpload,
    setDocuments,
  };
};
