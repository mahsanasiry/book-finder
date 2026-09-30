import type { Book } from "../types/book";

type GoogleVolume = {
  id: string;
  volumeInfo: {
    title?: string;
    authors?: string[];
    publisher?: string;
    imageLinks?: { thumbnail?: string };
    infoLink?: string;
  };
};

export async function searchBooks(query: string): Promise<Book[]> {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=12`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Network request failed");
  }

  const data = await response.json();
  const items: GoogleVolume[] = data.items ?? [];

  return items.map((item) => ({
    id: item.id,
    title: item.volumeInfo.title ?? "Untitled",
    authors: item.volumeInfo.authors ?? ["Unknown author"],
    publisher: item.volumeInfo.publisher ?? "Unknown publisher",
    cover: item.volumeInfo.imageLinks?.thumbnail?.replace("http://", "https://") ?? null,
    infoLink: item.volumeInfo.infoLink ?? "#",
  }));
}