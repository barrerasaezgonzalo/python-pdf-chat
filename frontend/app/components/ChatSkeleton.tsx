export const ChatSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 w-full animate-pulse">
      {/* Skeleton del Usuario */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
        <div className="h-4 w-48 bg-gray-700 rounded"></div>
      </div>

      {/* Skeleton de la Respuesta AI */}
      <div className="bg-[#1a1c24] p-6 rounded-xl border border-gray-800 ml-11">
        <div className="h-4 w-1/4 bg-gray-700 rounded mb-4"></div>
        <div className="space-y-3">
          <div className="h-3 w-full bg-gray-700 rounded"></div>
          <div className="h-3 w-full bg-gray-700 rounded"></div>
          <div className="h-3 w-5/6 bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  );
};
