# 📚 Book Finder

A fast, responsive web app for searching books by title or author, powered by the Google Books API.

**🔗 Live demo:** https://mahsanasiry.github.io/book-finder/

## About

Book Finder lets you type a title, author or keyword and instantly see matching books with their cover, authors and publisher. You can save favorites, sort and filter the results, and open a details page for any book. I built it as my solo project for the [Chingu](https://www.chingu.io/) community to practice the full cycle of a small frontend product: designing the UI, working with a real API, handling every state of the interface, and deploying it online.

## Features

- Search books by title, author or keyword
- Book cards with cover image, authors, publisher and a "More details" link
- Clear **loading**, **empty-result** and **error** states, including a friendly message when the API rate limit is reached
- Favorites list saved in the browser, so your picks stay after a refresh
- Sort results by title and filter to books with a cover
- Book details page with description, page count, categories and publication date
- Fallback placeholder when a book has no cover
- Fully responsive layout for mobile, tablet and desktop
- Accessible form: labelled input, keyboard-friendly, descriptive image alt text
- Automatic deployment to GitHub Pages on every push to `main`

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router, static export)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Google Books API](https://developers.google.com/books)
- GitHub Actions + GitHub Pages for CI/CD

## Getting Started

**Prerequisites:** Node.js 20 or newer.

1. Clone the repository:

   ```bash
   git clone https://github.com/mahsanasiry/book-finder.git
   cd book-finder
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. (Recommended) Add a Google Books API key. Without a key the app still works, but Google may rate-limit requests. Create a file named `.env.local` in the project root:

   ```
   NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY=your_api_key_here
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open http://localhost:3000 in your browser.

### Build for production

```bash
npm run build
```

The static site is generated in the `out` folder.

## How It Works

- The search form is a controlled component; submitting it calls a small `searchBooks` function.
- `searchBooks` requests the Google Books API, handles failed responses (including HTTP 429 rate limits), and maps the raw response into a clean, typed `Book` object.
- The page keeps a single `status` state (`idle`, `loading`, `success`, `error`) so the UI always shows exactly one correct message.
- Sorting and filtering are derived from the results on every render, working on a copy so the original list is never mutated.
- Favorites live in a custom hook built on `useSyncExternalStore` that keeps them in `localStorage`, so they survive refreshes and stay in sync across tabs.
- The details page is loaded by book ID: the ID is passed in the URL (`/book?id=...`) and the page fetches that book from the API in the browser. Because the site is exported as static files, this works for any book without pre-generating pages.
- Deployment runs through a GitHub Actions workflow that builds the app and publishes it to GitHub Pages.

## What I Learned

- Typing API responses in TypeScript and handling optional fields safely
- Managing asynchronous data and UI states in React
- Building custom hooks and syncing React state with `localStorage`
- Passing data between pages with URL query parameters in a statically exported Next.js app
- Building responsive layouts with Tailwind CSS and CSS grid
- Working with environment variables and API key restrictions
- Setting up a CI/CD pipeline with GitHub Actions and GitHub Pages
- Debugging real deployment problems, such as rate limits and build errors

## Roadmap

- [x] Favorites list saved in the browser
- [x] Book details page
- [x] Sorting and filtering of search results
- [ ] Remember the last search when returning to the page
- [ ] Pagination for large result sets

## Author

Built by [@mahsanasiry](https://github.com/mahsanasiry).