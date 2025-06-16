import { useEffect, useState } from "react";

export interface Category {
  id: number;
  categoryName: string;
  description: string;
}
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
//   const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}api/document/get-categories`);
        const data = await res.json();
        // Lấy danh sách tên danh mục từ trường "response"
        // const categoryNames = data.response.map((cat: any) => cat.categoryName);
        if (!res.ok) {
          throw new Error(data.message || "Không thể tải danh mục.");
        }
        setCategories(data.response);
        console.log("Danh mục:", data.response);
      } catch (error) {
        console.error("Lỗi khi tải danh mục:", error);
      }
    };

    fetchCategories();
  }, []);

  return { categories };
};
