export type BookDetails = {
  id: string;
  title: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  pageCount: number | null;
  categories: string[];
  description: string;
  cover: string | null;
  infoLink: string;
};

type GoogleVolumeDetails = {
  id: string;
  volumeInfo: {
    title?: string;
    authors?: string[];
    publisher?: string;
    publishedDate?: string;
    pageCount?: number;
    categories?: string[];
    description?: string;
    imageLinks?: { thumbnail?: string };
    infoLink?: string;
  };
};

function htmlToText(html: string): string {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent ?? "";
}

export async function getBookById(id: string): Promise<BookDetails> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;
  const keyPart = apiKey ? `?key=${apiKey}` : "";
  const url = `https://www.googleapis.com/books/v1/volumes/${encodeURIComponent(id)}${keyPart}`;
  const response = await fetch(url);

  if (response.status === 429) {
    throw new Error("Too many requests. Please wait a moment and try again.");
  }

  if (response.status === 404) {
    throw new Error("Book not found.");
  }

  if (!response.ok) {
    throw new Error("Network request failed");
  }

  const item: GoogleVolumeDetails = await response.json();
  const info = item.volumeInfo;

  return {
    id: item.id,
    title: info.title ?? "Untitled",
    authors: info.authors ?? ["Unknown author"],
    publisher: info.publisher ?? "Unknown publisher",
    publishedDate: info.publishedDate ?? "Unknown date",
    pageCount: info.pageCount ?? null,
    categories: info.categories ?? [],
    description: info.description
      ? htmlToText(info.description)
      : "No description available.",
    cover: info.imageLinks?.thumbnail?.replace("http://", "https://") ?? null,
    infoLink: info.infoLink ?? "#",
  };
}