"use client";

import { useState } from "react";
import SearchForm from "../app/components/SearchForm";
import BookCard from "../app/components/BookCard";
import { searchBooks } from "../app/lib/searchBooks";
import type { Book } from "../app/types/book";

type Status = "idle" | "loading" | "success" | "error";

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [status, setStatus] = useState<Status>("idle");

  async function handleSearch(query: string) {
    setStatus("loading");
    setBooks([]);
    try {
      const result = await searchBooks(query);
      setBooks(result);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-6">
      <h1 className="mb-6 text-center text-3xl font-bold">Book Finder</h1>
      <SearchForm onSearch={handleSearch} disabled={status === "loading"} />

      {status === "loading" && <p className="text-center">Loading...</p>}
      {status === "error" && (
        <p className="text-center text-red-600">
          Something went wrong. Please try again.
        </p>
      )}
      {status === "success" && books.length === 0 && (
        <p className="text-center">No books found.</p>
      )}

      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </main>
  );
}