"use client";
import { Logo } from "./components/Logo";
import { ListFiles } from "./components/ListFiles";
import { EmptyState } from "./components/EmptyState";
import { ChatList } from "./components/ChatList";
import { Modal } from "./components/Modal";
import { useDocumentContext } from "./context/DocumentContext";
import { DocumentSkeleton } from "./components/DocumentSkeleton";

const ContextaApp = () => {
  const { isLoadingDocs, selectedDoc, setSelectedDoc } = useDocumentContext();

  return (
    <div className="flex min-h-screen bg-[#11171e] p-6 gap-8 font-mono">
      <div className="w-1/3 flex flex-col gap-4 border-r border-white/20 pr-6">
        <Logo />

        {isLoadingDocs ? (
          <DocumentSkeleton />
        ) : (
          <ListFiles
            setSelectedDoc={setSelectedDoc}
            selectedDoc={selectedDoc}
          />
        )}
      </div>

      <div className="w-2/3 flex flex-col gap-6 ">
        <div className=" flex flex-col gap-4 ">
          {!selectedDoc ? <EmptyState /> : <ChatList />}
        </div>
      </div>

      <Modal
        isOpen={false}
        onClose={undefined}
        title={"¿Eliminar archivo?"}
        message={"Esta acción no se puede deshacer. ¿Seguro?"}
        onConfirm={undefined}
        type={"danger"}
      />
    </div>
  );
};

export default ContextaApp;
