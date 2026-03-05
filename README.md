![GitHub repo size](https://img.shields.io/github/repo-size/LucasHARosa/BBS-Portolio)
![GitHub language count](https://img.shields.io/github/languages/count/LucasHARosa/BBS-Portolio)
![GitHub top language](https://img.shields.io/github/languages/top/LucasHARosa/BBS-Portolio)
![GitHub last commit](https://img.shields.io/github/last-commit/LucasHARosa/BBS-Portolio)

# BBS-Portfolio

An interactive developer portfolio that emulates the aesthetic and navigation experience of a **BBS (Bulletin Board System)** — the text-based networks accessed via dial-up modem in the 1980s and 90s, before the modern web.

Instead of a conventional page-scroll layout, the entire portfolio is navigated through **CLI commands** typed directly into a terminal emulator running in the browser. The interface features CRT visual effects (scanlines, flicker, vignette), a monospaced typewriter font, a boot sequence, command history, and Tab autocomplete — the same interaction model used in games like _Hacknet_, _Uplink_, and _EXAPUNKS_.

> "Constraints became a visual language. The design was driven by text hierarchy, alignment, simple colors, and command flow — and that simplicity became a style."

---

## Goal

- Present a professional **developer portfolio** through a retro terminal interaction model
- Demonstrate mastery of **React 19**, **TypeScript**, and animation-driven UI
- Provide a **fully navigable CLI experience** — browsable by keyboard, mouse, or touch
- Deliver a **CRT-faithful aesthetic** through CSS-only effects without any canvas or WebGL
- Keep the codebase **minimal and maintainable** — one component, one data file

---

## Project Structure

```text
BBS-Portfolio/
├── public/
│   ├── favicon.svg          # Terminal prompt icon (>_)
│   └── imagens/             # Project screenshots
│
├── src/
│   ├── App.tsx              # Full terminal logic, rendering, and command router
│   ├── index.css            # Tailwind v4 + CRT effects + VT323 font
│   ├── main.tsx             # React entry point
│   └── data/
│       └── projects.ts      # Project data array
│
├── index.html               # HTML entry with OG/SEO metadata
├── vite.config.ts
├── tsconfig.json
└── package.json
```

### Key concepts

- **Single-component architecture** — `App.tsx` handles routing, rendering and state
- **Queue-based typewriter engine** — sequential `QueueAction` list drives animated output
- **CSS-only CRT effects** — scanline animation, flicker keyframes, vignette and grid overlay
- **Tab autocomplete** — `COMMANDS` array filtered against current input prefix
- **Command history** — Arrow Up/Down cycles through previous inputs
- **Clickable terminal output** — project titles, indices and page numbers are inlined links
- **Dynamic theming** — runtime CSS variable injection via `dangerouslySetInnerHTML`

---

## Features

- Boot sequence with animated line-by-line output
- Command router: `HOME`, `PORTFOLIO`, `ABOUT`, `UPTIME`, `CONTACT`, `HELP`, `CLEAR`, `THEME`
- `PORTFOLIO` with pagination (`PORTFOLIO 2`, clickable page numbers)
- `VIEW <id>` — project detail with description, stack, and links
- `THEME <name>` — live theme switching: `aizen`, `green`, `amber`, `blue`
- `UPTIME` — system status with real local time
- Keyboard: Enter to submit, Arrow Up/Down for history, Tab to autocomplete
- CRT overlay: scanline sweep, flicker, vignette, pixel grid
- Responsive layout — full terminal experience on mobile and desktop

---

## Running the Project

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Other available commands

```bash
# Type-check without emitting
npm run lint

# Production build
npm run build

# Preview production build
npm run preview
```

---

## Adding Projects

Edit [`src/data/projects.ts`](src/data/projects.ts) and append an entry to the `projects` array:

```ts
{
  id: 18,
  titulo: "Project Name",
  descricao: "Short description of what it does.",
  tags: ["WEB"],          // WEB | APP | WEB|APP
  imagem: "/imagens/project.png",
  Link: "https://...",    // live demo (optional)
  LinkGit: "https://...", // repository (optional)
  tipo: ["frontend"],
}
```

The portfolio command handles pagination automatically at 12 entries per page.

---

## Technologies

| Technology               | Role                              |
| ------------------------ | --------------------------------- |
| **React 19**             | UI and component state            |
| **TypeScript**           | Type safety across all layers     |
| **Vite 6**               | Bundler and dev server            |
| **Tailwind CSS v4**      | Utility-first styling             |
| **Framer Motion**        | Boot sequence and line animations |
| **VT323** (Google Fonts) | Monospaced terminal font          |
| **Lucide React**         | Minimal icon set                  |

---

## Deploy

The project is ready for static deployment on **Vercel**, **GitHub Pages**, or any CDN.

```bash
npm run build
# output: dist/
```

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

---

## References

- [BBS History — textfiles.com](http://textfiles.com)
- [Hacknet — game with terminal-style UI](https://store.steampowered.com/app/365450/Hacknet/)
- [Aizen Dark — iTerm2 Color Scheme](https://github.com/mbadolato/iTerm2-Color-Schemes)
- [VT323 Font — Google Fonts](https://fonts.google.com/specimen/VT323)

---

<div align="center">

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com) &nbsp;
[![forthebadge](https://forthebadge.com/images/badges/made-with-typescript.svg)](https://forthebadge.com) &nbsp;
[![forthebadge](https://forthebadge.com/images/badges/open-source.svg)](https://forthebadge.com)

</div>
