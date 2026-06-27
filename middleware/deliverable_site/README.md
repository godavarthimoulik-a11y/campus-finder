# Web Programming Deliverable

**Author:** moulik.godavarthi
**Domain:** web programming

## Overview

This is a polished, working static website deliverable showcasing responsive layout, accessible markup, and light JavaScript for interactive features (navigation toggle and contact form demo).

## Files

- `index.html` — main page
- `styles.css` — responsive styles
- `script.js` — small interactive behaviors
- `README.md` — this file
- `server.js` — optional Express demo server (handles /api/contact)
 - `package.json` — scripts and dependencies for the demo server
 - `projects/` — preview pages (`portfolio.html`, `todo.html`, `blog.html`)

## Run locally

Open `index.html` in any modern browser. For local development with a simple server (recommended), run:

```powershell
# from the deliverable_site folder
python -m http.server 8000
# then open http://localhost:8000
```

Or run the provided Express demo server which serves the site and accepts contact submissions:

```powershell
cd deliverable_site
npm install
npm start
# then open http://localhost:3000
```

API endpoints (demo):
- `POST /api/contact` — accepts JSON `{name,email,message}` and returns a demo acknowledgement and saves to `messages.json`
- `GET /api/messages` — lists received messages (persisted to `messages.json`)

Persisted messages are stored at `messages.json` in the site folder (demo).

## Notes

- The contact form will send to `/api/contact` when the demo server is running; otherwise it falls back to a local demo message.
- Feel free to customize the projects section and add real previews.