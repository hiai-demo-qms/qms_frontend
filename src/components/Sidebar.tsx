
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/documents";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SidebarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const Sidebar = ({ selectedCategory, onCategoryChange }: SidebarProps) => {
  return (
    <div className="w-64 h-full border-r bg-white">
      <ScrollArea className="h-full p-4">
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold">Documents</h2>
            <div className="space-y-1">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === selectedCategory ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    category === selectedCategory && "bg-qms-gray font-medium"
                  )}
                  onClick={() => onCategoryChange(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default Sidebar;
