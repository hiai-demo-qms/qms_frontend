
import { useState, useEffect } from 'react';

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<number[]>([]);

  useEffect(() => {
    const savedBookmarks = localStorage.getItem('bookmarkedDocuments');
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }
  }, []);

  const toggleBookmark = (documentId: number) => {
    const updatedBookmarks = bookmarks.includes(documentId)
      ? bookmarks.filter(id => id !== documentId)
      : [...bookmarks, documentId];
    
    setBookmarks(updatedBookmarks);
    localStorage.setItem('bookmarkedDocuments', JSON.stringify(updatedBookmarks));
  };

  const isBookmarked = (documentId: number) => {
    return bookmarks.includes(documentId);
  };

  return {
    bookmarks,
    toggleBookmark,
    isBookmarked
  };
};
