import { ChatMessage } from "../types";

export const MessageItem = ({ msg }: { msg: ChatMessage }) => {
  const isUser = msg.role === "user";

  return (
    <div className={`mb-4 flex ${isUser ? "justify-start" : "justify-end"}`}>
      <div
        className={`flex items-start gap-3 max-w-[80%] ${isUser ? "flex-row" : "flex-row-reverse"}`}
      >
        {/* Avatar: Solo para usuario, o añade otro para AI */}
        {isUser && (
          <img
            src="/avatar.png"
            alt="User"
            className="w-10 h-10 rounded-full"
          />
        )}

        <div
          className={`p-4 rounded-2xl border ${
            isUser
              ? "bg-[#1a202b] rounded-bl-none border-blue-100"
              : "bg-[#5a36b8] rounded-br-none border-purple-400"
          }`}
        >
          <p
            className={`text-xs ${isUser ? "text-gray-400" : "text-purple-200"}`}
          >
            {isUser ? "Usuario" : "AI"}
          </p>
          <p className="text-gray-100">{msg.content}</p>
        </div>
      </div>
    </div>
  );
};
