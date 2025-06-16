
import { useState } from "react";
// import { categories } from "@/data/documents";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, ClipboardCheck, Bookmark } from "lucide-react";
import { useCategories } from "@/hooks/useCategories";

interface SidebarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const Sidebar = ({ selectedCategory, onCategoryChange }: SidebarProps) => {
  const { categories } = useCategories();

  return (
    <div className="w-64 h-full border-r bg-white">
      <ScrollArea className="h-full p-4">
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold flex items-center">
              <ClipboardCheck className="mr-2 h-5 w-5 text-qms-blue" />
              ISO 9001:2015
            </h2>
            <div className="space-y-1">
              {/* Bookmarked Documents */}
              <Button
                variant={selectedCategory === "Bookmarked Documents" ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  selectedCategory === "Bookmarked Documents" && "bg-qms-gray font-medium"
                )}
                onClick={() => onCategoryChange("Bookmarked Documents")}
              >
                <Bookmark className="mr-2 h-4 w-4" />
                Tài liệu đã lưu
              </Button>
              <Button
                variant={selectedCategory === "All Documents" ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  selectedCategory === "All Documents" && "bg-qms-gray font-medium"
                )}
                onClick={() => onCategoryChange("All Documents")}
              >
                <FileText className="mr-2 h-4 w-4" />
                Tất cả tài liệu
              </Button>
              {/* Regular categories */}
              {categories.map((category) => (
                <Button
                  key={category.categoryName}
                  variant={category.categoryName === selectedCategory ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    category.categoryName === selectedCategory && "bg-qms-gray font-medium"
                  )}
                  onClick={() => onCategoryChange(category.categoryName)}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  {category.categoryName}
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
