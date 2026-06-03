import { ThumbsUp } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-10 mt-20">
      <div className="w-20 h-20 bg-[#5b35bb] rounded-full flex items-center justify-center mb-4">
        <span className="text-5xl">
          <ThumbsUp size={40} />
        </span>
      </div>
      <h3 className="text-xl font-bold text-white mb-4">
        Todo listo para empezar
      </h3>
      <p className="text-gray-400 mt-2 max-w-4xl">
        Una aplicación de chat inteligente para interactuar con tus documentos
        PDF. Sube tus archivos, haz preguntas y obtén respuestas rápidas y
        precisas. ¡Tu asistente PDF personal está aquí para ayudarte!
      </p>
    </div>
  );
}
