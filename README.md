<!-- # React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project. -->



# GadgetHeaven ✨

Your go-to destination for the latest and greatest gadgets.

## Live
- (add Netlify/Vercel link after deploy)

## Requirements
- See `Batch-10_Assignment-08.pdf` or original link.

## Tech Stack
- React + Vite, React Router v7
- TailwindCSS + DaisyUI
- React Toastify
- Context API + LocalStorage
- React Helmet Async (dynamic titles)
- Recharts (ComposedChart)

## Features
1. Home with banner, categories sidebar (nested behavior) and product cards
2. Details page with Add to Cart / Wishlist (wishlist button disabled after 1 click)
3. Dashboard with Cart & Wishlist tabs
   - Cart: total price, sort by price (desc), purchase modal (clears cart + redirects home)
   - Wishlist: add to cart (moves item), remove item
   - Optional limit: cart total capped at $1000
4. Stats page with Composed Chart (Price vs Product; scatter = rating)
5. 404 page; Navbar/Footer present on all pages
6. useLocation-based background change (Home vs others)
7. Data persisted to LocalStorage, reload-safe

## Getting Started
```bash
npm install
npm run dev