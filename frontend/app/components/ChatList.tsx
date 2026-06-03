import { Search, SendHorizontal } from "lucide-react";
import { useDocumentContext } from "../context/DocumentContext";
import { useEffect, useRef, useState } from "react";
import { useChat } from "../hooks/useChat";
import { MessageItem } from "./MessageItem";

export function ChatList() {
  const { selectedDoc } = useDocumentContext();
  const [input, setInput] = useState("");
  const { isLoadingChat, handleSendMessage, messages, setMessages } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoadingChat) return;
    handleSendMessage(input);
    setInput("");
  };

  useEffect(() => {
    setMessages([]);
  }, [selectedDoc]);

  return (
    <>
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 && selectedDoc ? (
          <h3 className="text-xl font-bold text-white mb-20 mt-20 text-center">
            {selectedDoc.name} cargado. ¿Qué te gustaría saber?
          </h3>
        ) : (
          messages.map((msg) => <MessageItem key={msg.id} msg={msg} />)
        )}
        {isLoadingChat && (
          <div className="flex items-start gap-3 mt-4 animate-pulse">
            <div className="w-10 h-10 bg-violet-600 rounded-full flex items-center justify-center">
              AI
            </div>
            <div className="bg-[#1a1c24] p-4 rounded-2xl w-full max-w-[80%] border border-gray-700">
              <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2"></div>
            </div>
          </div>
        )}
      </div>

      <div className="relative w-full mb-4 ">
        <form onSubmit={handleSubmit}>
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 w-8 h-8" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              isLoadingChat ? "Generando respuesta" : "Escribe tu consulta aquí"
            }
            disabled={isLoadingChat}
            type="text"
            className="w-full pl-12 p-4 border border-[#C0C0C0]/20 rounded bg-[#191e27] text-white focus:outline-none focus:border-violet-500 shadow-sm"
          />
          <button
            type="submit"
            disabled={isLoadingChat || !input.trim()}
            className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-400 hover:text-violet-400 disabled:hover:text-gray-400 transition"
          >
            <SendHorizontal className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 w-8 h-8 cursor-pointer" />
          </button>
        </form>
      </div>
    </>
  );
}
