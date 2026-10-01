"use client";

import { useState } from "react";
import SearchForm from "./components/SearchForm";
import BookCard from "./components/BookCard";
import { searchBooks } from "./lib/searchBooks";
import { useFavorites } from "./lib/useFavorites";
import type { Book } from "./types/book";

type Status = "idle" | "loading" | "success" | "error";
type View = "search" | "favorites";

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [view, setView] = useState<View>("search");
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  async function handleSearch(query: string) {
    setView("search");
    setStatus("loading");
    setBooks([]);
    try {
      const result = await searchBooks(query);
      setBooks(result);
      setStatus("success");
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong."
      );
      setStatus("error");
    }
  }

  const visibleBooks = view === "search" ? books : favorites;

  const tabClass = (active: boolean) =>
    `rounded-lg px-4 py-2 text-sm font-medium ${
      active ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <main className="mx-auto max-w-5xl px-4 py-6">
      <h1 className="mb-6 text-center text-3xl font-bold">Book Finder</h1>
      <SearchForm onSearch={handleSearch} disabled={status === "loading"} />

      <div className="mb-6 flex justify-center gap-2">
        <button
          type="button"
          onClick={() => setView("search")}
          className={tabClass(view === "search")}
        >
          Search results
        </button>
        <button
          type="button"
          onClick={() => setView("favorites")}
          className={tabClass(view === "favorites")}
        >
          Favorites ({favorites.length})
        </button>
      </div>

      {view === "search" && status === "loading" && (
        <p className="text-center">Loading...</p>
      )}
      {view === "search" && status === "error" && (
        <p className="text-center text-red-600">{errorMessage}</p>
      )}
      {view === "search" && status === "success" && books.length === 0 && (
        <p className="text-center">No books found.</p>
      )}
      {view === "favorites" && favorites.length === 0 && (
        <p className="text-center">
          You have no favorites yet. Tap the heart on a book to save it.
        </p>
      )}

      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
        {visibleBooks.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            isFavorite={isFavorite(book.id)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </main>
  );
}