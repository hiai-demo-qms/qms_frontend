import { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface ChatRequest {
  role: string;
}

export const useChatbot = () => {
  const [messages, setMessages] = useState<{ role: string; content: string; timestamp: string; }[]>([]);
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

  const now = new Date().toISOString();
  // 1. Hiển thị tin nhắn người dùng và "Đang phản hồi..."
  setMessages((prev) => [
      ...prev,
      { role: "user", content: question, timestamp: now },
      { role: "assistant", content: "Đang xử lý...", timestamp: now },
    ]);

    try {
      const response = await fetch(`${API_BASE_URL}api/chatbot/chat`, {
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

      // 2. Cập nhật lại tin nhắn bot cuối cùng bằng kết quả thực
      const responseTime = new Date().toISOString();

      setMessages((prev) => {
        const updated = [...prev];
        const lastBotIndex = updated.map((m) => m.role).lastIndexOf("assistant");
        if (lastBotIndex !== -1) {
          updated[lastBotIndex] = {
            role: "assistant",
            content: data.response,
            timestamp: responseTime,
          };
        }
        return updated;
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lỗi không xác định.");
      console.error("Error sending message:", err);
      // Nếu lỗi, thay thế tin "Đang phản hồi..." bằng lỗi
      setMessages((prev) => {
        const updated = [...prev];
        const lastBotIndex = updated.map((m) => m.role).lastIndexOf("assistant");
        if (lastBotIndex !== -1) {
          updated[lastBotIndex] = {
            role: "assistant",
            content: err.message || "Đã xảy ra lỗi khi xử lý yêu cầu.",
            timestamp: new Date().toISOString(),
          };
        }
        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  return { messages, loading, error, sendMessage };
}