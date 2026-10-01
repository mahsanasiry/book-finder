import Link from "next/link";
import type { Book } from "../types/book";

type Props = {
  book: Book;
  isFavorite: boolean;
  onToggleFavorite: (book: Book) => void;
};

export default function BookCard({ book, isFavorite, onToggleFavorite }: Props) {
  return (
    <article className="relative flex flex-col gap-2 rounded-xl bg-white p-4 shadow-sm">
      <button
        type="button"
        onClick={() => onToggleFavorite(book)}
        aria-pressed={isFavorite}
        aria-label={
          isFavorite
            ? `Remove ${book.title} from favorites`
            : `Add ${book.title} to favorites`
        }
        className="absolute right-3 top-3 rounded-full bg-white/90 px-2 py-1 text-xl leading-none shadow hover:bg-white"
      >
        {isFavorite ? "♥" : "♡"}
      </button>

      {book.cover ? (
        // eslint-disable-next-line @next/next/no-img-element
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
      <Link
        href={`/book?id=${encodeURIComponent(book.id)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto rounded-lg bg-blue-600 p-2 text-center text-white hover:bg-blue-700"
      >
        More details
      </Link>
    </article>
  );
}