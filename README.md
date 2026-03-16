# Document File Search

Lightweight offline network file search with content highlighting and inline SVG icons.

Network File Search is a fast and lightweight web app for searching files across your local network. It supports full-text search, previews of file content, and file-type icons rendered entirely with inline SVG—no external assets required. Built with Next.js, React, and TypeScript.

---

Features:
- Search files by name or content
- Highlight matching keywords in results
- Supports multiple file types: txt, pdf, docx, pptx, xlsx
- Inline SVG icons for file types (no external images)
- Responsive design (works on desktop & mobile)
- Lightweight & offline-friendly

---

Environment Variables:

Create a `.env.local` file in the project root with the following variables:

AUTH_SECRET=<your-auth-secret>
INIT_ADMIN_USERNAME=<your-username>
INIT_ADMIN_PASSWORD=<your-password>
MONGODB_URI=<your-mongodb-uri>
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=<your-google-site-key>
RECAPTCHA_SECRET_KEY=<your-google-secret-key>

---

Getting Started:

1. Install dependencies:

   npm install
   # or
   yarn install

2. Run the development server:

   npm run dev
   # or
   yarn dev

3. Open http://localhost:3000 in your browser.

---

Usage:

- Use the search bar to find files by name or content.
- Search results show:
  - File title
  - File path
  - File size
  - Last modified date
  - Preview snippet with highlighted search term
- File-type icons are displayed inline using SVG.

---

Technologies:

- Next.js - React framework for server-side rendering and API routes
- React - UI library
- TypeScript - Static typing
- MongoDB - File metadata storage
- Inline SVG icons for file types

---

License:

MIT License