import type { Book } from "../types/book";

export default function BookCard({ book }: { book: Book }) {
  return (
    <article className="flex flex-col gap-2 rounded-xl bg-white p-4 shadow-sm">
      {book.cover ? (
        <img
          src={book.cover}
          alt={`Cover of ${book.title}`}
          className="h-60 w-full object-contain"
        />
      ) : (
        <div className="flex h-60 items-center justify-center rounded-lg bg-gray-200 text-gray-500">
          No cover
        </div>
      )}
      <h2 className="text-base font-semibold">{book.title}</h2>
      <p className="text-sm">{book.authors.join(", ")}</p>
      <p className="text-sm text-gray-500">{book.publisher}</p>
      <a
        href={book.infoLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto rounded-lg bg-blue-600 p-2 text-center text-white hover:bg-blue-700"
      >
        More details
      </a>
    </article>
  );
}