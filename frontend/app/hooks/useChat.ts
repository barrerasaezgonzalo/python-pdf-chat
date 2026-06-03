import { useState } from "react";
import { useDocumentContext } from "../context/DocumentContext";
import { api } from "../services/api";
import { ChatMessage } from "../types";

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const { selectedDoc, isLoadingChat, setIsLoadingChat } = useDocumentContext();

  const handleSendMessage = async (text: string) => {
    const newUserMessage = {
      id: Date.now(),
      role: "user",
      content: text,
    } as ChatMessage;
    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoadingChat(true);

    try {
      const response = await api.sendMessage({
        query: text,
        fileName: selectedDoc?.name ?? "",
      });

      const aiMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: response.respuesta,
      } as ChatMessage;
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error en el chat:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          role: "error",
          content: "Lo siento, hubo un error al procesar tu consulta.",
        } as ChatMessage,
      ]);
    } finally {
      setIsLoadingChat(false);
    }
  };

  return { messages, handleSendMessage, isLoadingChat, setMessages };
};
