"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getBookById } from "../lib/getBook";
import type { BookDetails } from "../lib/getBook";

type Result = {
  id: string;
  book: BookDetails | null;
  error: string | null;
};

function BookDetailsView() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [result, setResult] = useState<Result | null>(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    getBookById(id)
      .then((book) => {
        if (!cancelled) setResult({ id, book, error: null });
      })
      .catch((error) => {
        if (!cancelled) {
          setResult({
            id,
            book: null,
            error:
              error instanceof Error ? error.message : "Something went wrong.",
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  const isLoading = id !== null && result?.id !== id;
  const book = result?.id === id ? result.book : null;
  const error = result?.id === id ? result.error : null;

  return (
    <main className="mx-auto max-w-3xl px-4 py-6">
      <Link href="/" className="mb-6 inline-block text-blue-600 hover:underline">
        ← Back to search
      </Link>

      {!id && <p className="text-center">No book selected.</p>}
      {isLoading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {book && (
        <article className="flex flex-col gap-6 rounded-xl bg-white p-6 shadow-sm sm:flex-row">
          {book.cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={book.cover}
              alt={`Cover of ${book.title}`}
              className="h-64 w-44 shrink-0 self-center object-contain sm:self-start"
            />
          ) : (
            <div className="flex h-64 w-44 shrink-0 items-center justify-center self-center rounded-lg bg-gray-200 text-gray-500 sm:self-start">
              No cover
            </div>
          )}

          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{book.title}</h1>
            <p>{book.authors.join(", ")}</p>
            <p className="text-sm text-gray-500">
              {book.publisher} · {book.publishedDate}
            </p>
            {book.pageCount !== null && (
              <p className="text-sm">{book.pageCount} pages</p>
            )}
            {book.categories.length > 0 && (
              <p className="text-sm">{book.categories.join(", ")}</p>
            )}
            <p className="mt-2 whitespace-pre-line text-sm leading-relaxed">
              {book.description}
            </p>
            <a
              href={book.infoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 self-start rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              View on Google Books
            </a>
          </div>
        </article>
      )}
    </main>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<p className="p-6 text-center">Loading...</p>}>
      <BookDetailsView />
    </Suspense>
  );
}