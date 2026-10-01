"use client";

import { useEffect, useState } from "react";
import type { Book } from "../types/book";

const STORAGE_KEY = "book-finder:favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<Book[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setFavorites(JSON.parse(saved));
      }
    } catch {
      setFavorites([]);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // storage may be unavailable; the app still works without it
    }
  }, [favorites, loaded]);

  function isFavorite(id: string) {
    return favorites.some((book) => book.id === id);
  }

  function toggleFavorite(book: Book) {
    setFavorites((previous) =>
      previous.some((item) => item.id === book.id)
        ? previous.filter((item) => item.id !== book.id)
        : [...previous, book]
    );
  }

  return { favorites, isFavorite, toggleFavorite };
}