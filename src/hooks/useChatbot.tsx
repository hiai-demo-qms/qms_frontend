import { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface ChatRequest {
  role: string;
}

export const useChatbot = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const accessToken = localStorage.getItem("accessToken");

  const sendMessage = async (question: string) => {
    if (!accessToken) {
      setError("Bạn cần đăng nhập để sử dụng chatbot.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}api/chatbot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error("Lỗi khi gửi tin nhắn.");
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "user", content: question }, { role: "assistant", content: data.response }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lỗi không xác định.");
    } finally {
      setLoading(false);
    }
  };

  return { messages, loading, error, sendMessage };
}