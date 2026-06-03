export interface Document {
  id: string;
  name: string;
  status: string;
}

export interface ChatMessage {
  id: number;
  role: "user" | "assistant" | "error";
  content: string;
}
