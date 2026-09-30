"use client";

import { useState } from "react";

type Props = {
  onSearch: (query: string) => void;
  disabled: boolean;
};

export default function SearchForm({ onSearch, disabled }: Props) {
  const [query, setQuery] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    onSearch(trimmed);
  }

  return (
    <form className="mb-6 flex gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a book..."
        aria-label="Search for a book"
        className="flex-1 rounded-lg border border-gray-300 bg-white p-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        disabled={disabled}
        className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        Search
      </button>
    </form>
  );
}