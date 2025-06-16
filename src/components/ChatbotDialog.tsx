import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";
import { useChatbot } from "@/hooks/useChatbot";

interface ChatbotDialogProps {
  isOpen: boolean;
  onClose: () => void;
}


const ChatbotDialog = ({ isOpen, onClose }: ChatbotDialogProps) => {
  const endRef = useRef<HTMLDivElement>(null);
  const { messages, loading, error, sendMessage } = useChatbot();
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (input.trim() === "" || loading) return;
    await sendMessage(input);
    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !loading) {
      handleSend();
    }
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md md:max-w-lg h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle>Trợ lý QMS</DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-grow p-4 my-2">
          <div className="space-y-4">
            <div className="text-sm text-gray-600 italic">
              Xin chào! Tôi là Trợ lý QMS của bạn. Tôi có thể giúp gì cho bạn về tài liệu ISO hôm nay?
            </div>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    msg.role === "user"
                      ? "bg-qms-blue text-white"
                      : msg.content === "Đang phản hồi..."
                      ? "bg-gray-200 text-gray-600 flex items-center gap-2"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {msg.content === "Đang phản hồi..." ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {msg.content}
                    </>
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}
            {error && (
              <div className="text-red-600 text-sm italic">{error}</div>
            )}
            <div ref={endRef} />
          </div>
        </ScrollArea>

        <DialogFooter className="flex-shrink-0 flex gap-2">
          <div className="flex-grow">
            <Input
              placeholder="Nhập tin nhắn của bạn..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full"
              disabled={loading}
            />
          </div>
          <Button
            onClick={handleSend}
            className="bg-qms-blue hover:bg-qms-lightBlue"
            disabled={loading}
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Gửi"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChatbotDialog;
