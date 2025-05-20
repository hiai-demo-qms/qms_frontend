
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ChatbotDialog from "./ChatbotDialog";
import { MessageCircle } from "lucide-react";

const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg bg-qms-blue hover:bg-qms-lightBlue flex items-center justify-center"
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
      <ChatbotDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default ChatbotButton;
