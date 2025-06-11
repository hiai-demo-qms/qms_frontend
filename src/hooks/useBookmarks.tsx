
import { useState, useEffect } from 'react';

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  useEffect(() => {
    const savedBookmarks = localStorage.getItem('bookmarkedDocuments');
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }
  }, []);

  const toggleBookmark = (documentId: string) => {
    const updatedBookmarks = bookmarks.includes(documentId)
      ? bookmarks.filter(id => id !== documentId)
      : [...bookmarks, documentId];
    
    setBookmarks(updatedBookmarks);
    localStorage.setItem('bookmarkedDocuments', JSON.stringify(updatedBookmarks));
  };

  const isBookmarked = (documentId: string) => {
    return bookmarks.includes(documentId);
  };

  return {
    bookmarks,
    toggleBookmark,
    isBookmarked
  };
};
