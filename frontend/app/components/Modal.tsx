import { X } from "lucide-react";

export const Modal = ({
  isOpen,
  onClose,
  title,
  message,
  onConfirm,
  type,
}: any) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm text-center">
      <div className="bg-[#0f1117] border border-gray-800 pt-2 pb-6 px-4 rounded-2xl w-full flex flex-col max-w-sm shadow-2xl">
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white ml-auto cursor-pointer"
        >
          <X size={25} />
        </button>
        <h2 className="text-lg text-center text-white mb-2">{title}</h2>
        {message && (
          <p className="text-gray-400 mt-6 mb-6 border-2 border-dashed p-4 rounded">
            {message}
          </p>
        )}

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-2 text-gray-400 hover:text-white cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-2 rounded-lg font-bold cursor-pointer ${
              type === "danger"
                ? "bg-red-600 hover:bg-red-700"
                : "bg-violet-600 hover:bg-violet-700"
            } text-white`}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};
