export const DocumentSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 mt-4 animate-pulse">
      {[1, 2].map((i) => (
        <div
          key={i}
          className="h-14 w-full bg-[#1a1c24] rounded-lg border border-gray-800 flex items-center px-4"
        >
          {/* Icono PDF */}
          <div className="w-6 h-8 bg-gray-700 rounded-sm mr-3"></div>
          {/* Nombre del archivo */}
          <div className="h-4 w-32 bg-gray-700 rounded"></div>
          {/* Icono borrar */}
          <div className="w-5 h-5 bg-gray-700 rounded-full ml-auto"></div>
        </div>
      ))}
    </div>
  );
};
