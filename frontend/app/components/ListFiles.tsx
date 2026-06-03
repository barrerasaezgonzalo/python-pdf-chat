import { useEffect, useState } from "react";
import { Upload, Trash, CheckCheck, Clock, X, Loader2 } from "lucide-react";
import { Document } from "../types";
import { useDocuments } from "../hooks/useDocuments";
import { useChat } from "../hooks/useChat";

export function ListFiles({
  setSelectedDoc,
  selectedDoc,
}: {
  setSelectedDoc: (doc: Document | null) => void;
  selectedDoc: Document | null;
}) {
  const { documents, uploadDocument, fetchDocuments, deleteDocument } =
    useDocuments();
  const [isUploading, setIsUploading] = useState(false);
  const [search, setSearch] = useState("");
  const [modalConfig, setModalConfig] = useState<{
    type: "switch" | "delete";
    doc: Document;
  } | null>(null);
  const { setMessages } = useChat();

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleDocumentClick = (doc: Document) => {
    if (doc.status !== "ready") return;
    if (selectedDoc && doc.id !== selectedDoc.id) {
      setModalConfig({ type: "switch", doc });
    } else {
      setSelectedDoc(doc);
    }
  };

  const handleDeleteClick = (e: React.MouseEvent, doc: Document) => {
    e.stopPropagation(); // Evita que el clic abra el chat
    setModalConfig({ type: "delete", doc });
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      await uploadDocument(file);
      fetchDocuments();
    } catch (error) {
      console.error("Error al subir:", error);
    } finally {
      setIsUploading(false);
      if (event.target) event.target.value = "";
    }
  };

  useEffect(() => {
    const hasPending = documents.some((doc) => doc.status !== "ready");
    if (!hasPending) return;
    const interval = setInterval(() => {
      fetchDocuments();
    }, 3000);
    return () => clearInterval(interval);
  }, [documents, fetchDocuments]);

  const filteredDocuments = documents.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="w-90 h-full">
      <h2 className="text-md font-bold text-gray-300 uppercase tracking-wider ml-2">
        Selecciona un archivo para comenzar a chatear
      </h2>

      <div className="relative border border-[#272c35] rounded mt-4 mb-4">
        <input
          type="text"
          placeholder="Buscar Archivo..."
          className="w-full p-2 border border-[#272c35] rounded bg-[#191e27] focus:outline-none shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {search && (
          <button
            type="button"
            className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            onClick={() => setSearch("")}
          >
            <X size={20} />
          </button>
        )}
      </div>

      <label
        className={`cursor-pointer py-4 rounded-lg flex items-center gap-2 transition-colors ${
          isUploading
            ? "bg-slate-700 cursor-not-allowed opacity-80"
            : "bg-[#5b35bb] hover:bg-violet-700 text-white"
        }`}
      >
        <div className="flex mx-auto gap-2 text-white">
          {isUploading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              <span>Procesando archivo...</span>
            </>
          ) : (
            <>
              <Upload size={20} />
              <span>Subir Archivo</span>
            </>
          )}
        </div>

        <input
          type="file"
          accept=".pdf"
          className="hidden"
          disabled={isUploading}
          onChange={handleFileChange}
        />
      </label>

      <div className="flex flex-col gap-3 mt-2">
        {filteredDocuments.map((doc: Document) => {
          return (
            <div
              key={doc.id}
              onClick={() => handleDocumentClick(doc)}
              className={`bg-slate-900 hover:bg-slate-800 p-2 rounded border border-slate-800 shadow-sm flex flex-col ${selectedDoc?.id === doc.id ? "ring-2 ring-blue-500" : ""} ${doc.status !== "ready" ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-slate-800"}`}
            >
              <div className="flex items-center w-full gap-3">
                <img src="/pdf.png" alt="PDF Icon" className="w-8 h-8" />

                <div className="flex-1 min-w-0 flex items-center justify-between">
                  <span
                    className="truncate text-xs text-gray-300"
                    title={doc.name}
                  >
                    {doc.name}
                  </span>
                  <span className="text-gray-400 ml-2">
                    {doc.status === "ready" ? (
                      <CheckCheck size={16} />
                    ) : (
                      <Clock size={16} />
                    )}
                  </span>
                </div>

                <button
                  onClick={(e) => handleDeleteClick(e, doc)}
                  className="text-red-700 hover:text-red-500 ml-2"
                >
                  <Trash size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {modalConfig && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#191e27] p-6 rounded-lg border border-slate-700 shadow-xl max-w-sm w-full">
            <h3 className="text-lg font-bold text-white mb-2">
              {modalConfig.type === "switch"
                ? "¿Cambiar de documento?"
                : "¿Eliminar documento?"}
            </h3>
            <p className="text-gray-400 mb-6">
              {modalConfig.type === "switch"
                ? "Si cambias de archivo, la conversación actual se borrará."
                : `¿Estás seguro de que quieres eliminar "${modalConfig.doc.name}"? Esta acción no se puede deshacer.`}
            </p>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setModalConfig(null)}
                className="px-4 py-2 text-gray-400 hover:text-white"
              >
                Cancelar
              </button>
              <button
                onClick={async () => {
                  if (modalConfig.type === "switch") {
                    setMessages([]);
                    setSelectedDoc(modalConfig.doc);
                  } else {
                    await deleteDocument(modalConfig.doc.id);
                    if (selectedDoc?.id === modalConfig.doc.id)
                      setSelectedDoc(null);
                    fetchDocuments();
                  }
                  setModalConfig(null);
                }}
                className={`px-4 py-2 rounded text-white ${modalConfig.type === "delete" ? "bg-red-600" : "bg-violet-600"}`}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
