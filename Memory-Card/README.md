# Memory Card

A lightweight React memory card game built with Vite. Flip cards to find matching pairs — matches flash green, mismatches flash red. Designed for quick play and easy customization.

Live Demo: https://memory-card-alpha-seven.vercel.app/

## Demo / Screenshots

Place preview images in the `demo/` folder and reference them here. Example files to add to `demo/`:

- `demo/screenshot-1.png` — Game board
- `demo/screenshot-2.png` — Win message

Example markdown to embed images:

```md
![Game board](demo/screenshot-1.png)
![Win message](demo/screenshot-2.png)
```

---

## Features

- Responsive 4x4 cards grid
- Flip to reveal card values
- Track moves and score
- Green flash for matched pairs
- Red flash for mismatched pairs (brief animation)
- Simple reset / restart button

---

## How it works (overview)

- Card data is initialized and shuffled on load.
- Clicking a card flips it; the game locks input while two cards are being evaluated.
- If the pair matches, the cards remain revealed and receive a `matched` state (green styling).
- If the pair does not match, the cards receive a `mismatch` state (red styling) for a short time and then flip back.

Key files:

- `src/hooks/useGameLogic.js` — main game logic (shuffling, flip, match detection, mismatch flow)
- `src/components/Card.jsx` — card UI and classes (`flipped`, `matched`, `mismatch`)
- `src/index.css` — styles and animations

---

## Tech Stack

- React 19
- Vite
- Vanilla CSS

---

## Local Setup

Clone the repository and install dependencies:

```bash
git clone <repo-url>
cd Memory-Card
npm install
```

Run the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Linting:

```bash
npm run lint
```

> Note: The main npm scripts are defined in `package.json` and include `dev` (vite), `build`, `preview` and `lint`.

---

## Deploying

This project works great on Vercel (already deployed):

https://memory-card-alpha-seven.vercel.app/

To deploy manually on Vercel:

1. Create a new project in Vercel and point it to this repository.
2. Set the framework to "Vite" or let Vercel detect it.
3. Build command: `npm run build` and Output directory: `dist`.

---

## ⚙️ Customization Tips

- Change the mismatch duration: edit the timeout in `src/hooks/useGameLogic.js` (default 800ms).
- Adjust color/animation: update `.card.mismatch .card-back` in `src/index.css`.
- Add more cards: update the source that provides `cardValues`.

---

## 🤝 Contributing

PRs and issues welcome. Keep changes focused and include a short description of your change.

---

## 🧾 License

This project is unlicensed by default — add a license of your choice (MIT recommended) or update this section to reflect your preferred license.

---

## 👤 Author

FiyinfoluwaDav — https://github.com/FiyinfoluwaDav

If you want, I can add an example `LICENSE` file (MIT) and embed your demo screenshots directly into this README — tell me the screenshot filenames and I'll add them.
