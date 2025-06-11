
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";

interface ChatMessage {
  type: "user" | "bot" | "loading";
  text: string;
}

interface ChatbotDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatbotDialog = ({ isOpen, onClose }: ChatbotDialogProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      type: "bot",
      text: "Xin chào! Tôi là Trợ lý QMS của bạn. Tôi có thể giúp gì cho bạn về tài liệu ISO hôm nay?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = () => {
    if (input.trim() === "" || isLoading) return;

    const userMessage = input;
    
    // Add user message
    setMessages(prev => [...prev, { type: "user", text: userMessage }]);
    
    // Add loading message
    setMessages(prev => [...prev, { type: "loading", text: "Đang chờ phản hồi..." }]);
    setIsLoading(true);
    setInput("");
    
    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "Tôi có thể giúp bạn tìm tài liệu ISO liên quan đến chủ đề đó.",
        "Để tôi kiểm tra cơ sở dữ liệu của chúng ta để tìm tài liệu có liên quan.",
        "Đó là một câu hỏi hay về hệ thống quản lý chất lượng!",
        "Theo tiêu chuẩn ISO, đây là một lĩnh vực tuân thủ quan trọng.",
        "Tôi có thể hướng dẫn bạn qua quy trình tài liệu của chúng ta cho vấn đề đó.",
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      // Remove loading message and add bot response
      setMessages(prev => {
        const withoutLoading = prev.filter(msg => msg.type !== "loading");
        return [...withoutLoading, { type: "bot", text: randomResponse }];
      });
      setIsLoading(false);
    }, 2000); // Increased delay to better show the loading state
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading) {
      handleSend();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md md:max-w-lg h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle>Trợ lý QMS</DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-grow p-4 my-2">
          <div className="space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    msg.type === "user"
                      ? "bg-qms-blue text-white"
                      : msg.type === "loading"
                      ? "bg-gray-200 text-gray-600 flex items-center gap-2"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {msg.type === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {msg.text}
                    </>
                  ) : (
                    msg.text
                  )}
                </div>
              </div>
            ))}
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
              disabled={isLoading}
            />
          </div>
          <Button 
            onClick={handleSend} 
            className="bg-qms-blue hover:bg-qms-lightBlue"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Gửi"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChatbotDialog;
