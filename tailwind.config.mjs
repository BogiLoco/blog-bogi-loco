import daisyui from 'daisyui';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {},
  },
  plugins: [typography, daisyui],
  daisyui: {
    // Curated subset of daisyUI's theme catalog, picked via the theme switcher.
    themes: ['dark', 'dracula', 'night', 'cyberpunk', 'synthwave', 'forest', 'cupcake', 'light'],
    darkTheme: 'dark',
  },
};
