import { createContext, useContext, useState } from "react";
import { Document } from "../types";

type DocumentContextType = {
  documents: Document[];
  setDocuments: React.Dispatch<React.SetStateAction<Document[]>>;
  selectedDoc: Document | null;
  setSelectedDoc: React.Dispatch<React.SetStateAction<Document | null>>;
  isLoadingDocs: boolean;
  setisLoadingDocs: React.Dispatch<React.SetStateAction<boolean>>;
  isLoadingChat: boolean;
  setIsLoadingChat: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
};

const DocumentContext = createContext<DocumentContextType | null>(null);

export const DocumentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [isLoadingDocs, setisLoadingDocs] = useState(false);
  const [isLoadingChat, setIsLoadingChat] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <DocumentContext.Provider
      value={{
        documents,
        setDocuments,
        selectedDoc,
        setSelectedDoc,
        isLoadingDocs,
        setisLoadingDocs,
        isLoadingChat,
        setIsLoadingChat,
        error,
        setError,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocumentContext = () => {
  const context = useContext(DocumentContext);

  if (!context) {
    throw new Error(
      "useDocumentContext debe ser usado dentro de un DocumentProvider",
    );
  }

  return context;
};
