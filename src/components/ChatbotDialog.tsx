
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatMessage {
  type: "user" | "bot";
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
      text: "Hello! I'm your QMS Assistant. How can I help you with your ISO documentation today?",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;

    // Add user message
    setMessages([...messages, { type: "user", text: input }]);
    
    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "I can help you find ISO documentation related to that topic.",
        "Let me check our database for relevant documents.",
        "That's a good question about quality management systems!",
        "According to ISO standards, this is an important compliance area.",
        "I can guide you through our documentation process for that.",
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      setMessages((prev) => [...prev, { type: "bot", text: randomResponse }]);
    }, 1000);
    
    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md md:max-w-lg h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle>QMS Assistant</DialogTitle>
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
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <DialogFooter className="flex-shrink-0 flex gap-2">
          <div className="flex-grow">
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full"
            />
          </div>
          <Button onClick={handleSend} className="bg-qms-blue hover:bg-qms-lightBlue">
            Send
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChatbotDialog;
