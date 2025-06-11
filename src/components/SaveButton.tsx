
import { Button } from "@/components/ui/button";
import { Save, Loader2 } from "lucide-react";

interface SaveButtonProps {
  onSave: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  variant?: "default" | "outline";
  children?: React.ReactNode;
}

const SaveButton = ({ 
  onSave, 
  isLoading = false, 
  disabled = false, 
  variant = "outline",
  children = "Lưu bản nháp"
}: SaveButtonProps) => {
  return (
    <Button
      onClick={onSave}
      disabled={disabled || isLoading}
      variant={variant}
      className="flex items-center gap-2"
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Save className="h-4 w-4" />
      )}
      {children}
    </Button>
  );
};

export default SaveButton;
