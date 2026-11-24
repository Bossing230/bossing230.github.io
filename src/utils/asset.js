// Resolves a file in public/assets/img, respecting Vite's configured base path.
export const img = (file) => `${import.meta.env.BASE_URL}assets/img/${file}`;
