"use client";

import { useSyncExternalStore } from "react";
import type { Book } from "../types/book";

const STORAGE_KEY = "book-finder:favorites";
const EMPTY: Book[] = [];

let cachedRaw: string | null = null;
let cachedValue: Book[] = EMPTY;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function getSnapshot(): Book[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw !== cachedRaw) {
      cachedRaw = raw;
      try {
        cachedValue = raw ? JSON.parse(raw) : EMPTY;
      } catch {
        cachedValue = EMPTY;
      }
    }
  } catch {
    // storage is unavailable; keep the last known value
  }
  return cachedValue;
}

function getServerSnapshot(): Book[] {
  return EMPTY;
}

function save(next: Book[]) {
  cachedValue = next;
  try {
    const raw = JSON.stringify(next);
    localStorage.setItem(STORAGE_KEY, raw);
    cachedRaw = raw;
  } catch {
    // storage is unavailable; favorites still work until the page closes
  }
  listeners.forEach((listener) => listener());
}

export function useFavorites() {
  const favorites = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  function isFavorite(id: string) {
    return favorites.some((book) => book.id === id);
  }

  function toggleFavorite(book: Book) {
    const current = getSnapshot();
    save(
      current.some((item) => item.id === book.id)
        ? current.filter((item) => item.id !== book.id)
        : [...current, book]
    );
  }

  return { favorites, isFavorite, toggleFavorite };
}